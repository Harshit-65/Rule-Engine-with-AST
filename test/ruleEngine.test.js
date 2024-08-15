const assert = require("assert");
const http = require("http");
const { URL } = require("url");
const server = require("../server");
const Rule = require("../models/Rule");

const baseUrl = "http://localhost:3000";

async function sendRequest(path, method, data) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return new Promise((resolve, reject) => {
    const req = http.request(new URL(path, baseUrl), options, (res) => {
      let body = "";

      res.on("data", (chunk) => {
        body += chunk;
      });

      res.on("end", () => {
        try {
          resolve({ statusCode: res.statusCode, body: JSON.parse(body) });
        } catch (err) {
          reject(new Error("Failed to parse response body as JSON"));
        }
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

describe("Rule Engine API", function () {
  this.timeout(10000); // Set timeout to 10 seconds

  beforeEach(async () => {
    await Rule.deleteMany({});
  });

  describe("/POST create_rule", () => {
    it("should create a rule and return its AST representation", async () => {
      const ruleData = {
        ruleName: "rule1",
        ruleString:
          "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)",
      };

      const response = await sendRequest("/api/create_rule", "POST", ruleData);

      assert.strictEqual(response.statusCode, 201);
      assert.ok(response.body.rule);
      assert.ok(response.body.rule.ruleAST);
    });

    it("should not create a rule with a duplicate name", async () => {
      const ruleData = {
        ruleName: "rule1",
        ruleString:
          "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)",
      };

      await sendRequest("/api/create_rule", "POST", ruleData);

      const response = await sendRequest("/api/create_rule", "POST", ruleData);

      assert.strictEqual(response.statusCode, 400);
      assert.strictEqual(response.body.error, "Rule name already exists");
    });
  });

  describe("/POST combine_rules", () => {
    it("should combine two rules and return the combined AST", async () => {
      const rule1 = new Rule({
        ruleName: "rule1",
        ruleAST: {
          type: "operator",
          operator: "AND",
          left: { type: "operand", value: { age: { $gt: 30 } } },
          right: { type: "operand", value: { department: "Sales" } },
        },
      });
      const rule2 = new Rule({
        ruleName: "rule2",
        ruleAST: {
          type: "operator",
          operator: "OR",
          left: { type: "operand", value: { salary: { $gt: 50000 } } },
          right: { type: "operand", value: { experience: { $gt: 5 } } },
        },
      });

      await rule1.save();
      await rule2.save();

      const combineData = {
        rules: ["rule1", "rule2"],
        op: "AND",
      };

      const response = await sendRequest(
        "/api/combine_rules",
        "POST",
        combineData
      );

      assert.strictEqual(response.statusCode, 201);
      assert.ok(response.body.ruleAST);
    });

    it("should return error if one or both rules are not found", async () => {
      const combineData = {
        rules: ["rule1", "rule2"],
        op: "AND",
      };

      const response = await sendRequest(
        "/api/combine_rules",
        "POST",
        combineData
      );

      assert.strictEqual(response.statusCode, 404);
      assert.strictEqual(response.body.error, "One or both rules not found");
    });
  });

  describe("/POST evaluate_rule", () => {
    it("should evaluate a rule against given JSON data and return the result", async () => {
      const rule = new Rule({
        ruleName: "rule1",
        ruleAST: {
          type: "operator",
          operator: "AND",
          left: { type: "operand", value: { age: { $gt: 30 } } },
          right: { type: "operand", value: { department: "Sales" } },
        },
      });

      await rule.save();

      const evaluationData = {
        ruleName: "rule1",
        data: { age: 29, department: "Sales", salary: 60000, experience: 3 },
      };

      const response = await sendRequest(
        "/api/evaluate_rule",
        "POST",
        evaluationData
      );

      assert.strictEqual(response.statusCode, 200);
      assert.strictEqual(response.body.result, false);
    });

    it("should return false if data does not match the rule", async () => {
      const rule = new Rule({
        ruleName: "rule1",
        ruleAST: {
          type: "operator",
          operator: "AND",
          left: { type: "operand", value: { age: { $gt: 30 } } },
          right: { type: "operand", value: { department: "Sales" } },
        },
      });

      await rule.save();

      const evaluationData = {
        ruleName: "rule1",
        data: {
          age: 25,
          department: "Marketing",
          salary: 60000,
          experience: 3,
        },
      };

      const response = await sendRequest(
        "/api/evaluate_rule",
        "POST",
        evaluationData
      );

      assert.strictEqual(response.statusCode, 200);
      assert.strictEqual(response.body.result, false);
    });

    it("should return an error if the rule is not found", async () => {
      const evaluationData = {
        ruleName: "nonExistentRule",
        data: { age: 35, department: "Sales", salary: 60000, experience: 3 },
      };

      const response = await sendRequest(
        "/api/evaluate_rule",
        "POST",
        evaluationData
      );

      assert.strictEqual(response.statusCode, 404);
      assert.strictEqual(response.body.error, "Rule not found");
    });
  });
});
