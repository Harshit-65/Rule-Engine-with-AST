const Rule = require("../models/Rule");
const { tokenizeRuleString, mergeRules, evaluate } = require("../utils/ast");
const astUtils = require("../utils/ast");

exports.createRule = async (req, res) => {
  try {
    const { ruleName, ruleString, update = false } = req.body;
    if (!ruleName || !ruleString) {
      return res
        .status(400)
        .json({ error: "ruleName and ruleString are required" });
    }

    const ruleAST = tokenizeRuleString(ruleString);

    let rule;
    if (update) {
      // Find and update existing rule
      rule = await Rule.findOneAndUpdate(
        { ruleName },
        { ruleAST },
        { new: true }
      );
      if (!rule) {
        return res.status(404).json({ error: "Rule not found for update" });
      }
    } else {
      // Check if the rule already exists
      const existingRule = await Rule.findOne({ ruleName });
      if (existingRule) {
        return res
          .status(400)
          .json({ error: "Rule with this name already exists" });
      }

      rule = new Rule({ ruleName, ruleAST });
      await rule.save();
    }

    res.json({
      message: update
        ? "Rule updated successfully"
        : "Rule created successfully",
      ruleAST,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.combineRules = async (req, res) => {
  try {
    const { rules, op } = req.body;

    if (!rules || rules.length !== 2 || !op) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const [rule1Name, rule2Name] = rules;

    const rule1 = await Rule.findOne({ ruleName: rule1Name });
    const rule2 = await Rule.findOne({ ruleName: rule2Name });

    if (!rule1 || !rule2) {
      return res.status(404).json({ error: "One or both rules not found" });
    }

    const rule1AST = rule1.ruleAST;
    const rule2AST = rule2.ruleAST;

    const combinedAST = astUtils.mergeRules([rule1AST, rule2AST], op);

    const combinedRule = new Rule({
      ruleName: `${rule1Name}_${rule2Name}_${op}`,
      ruleAST: combinedAST,
    });

    await combinedRule.save();

    res.status(201).json({
      ruleName: `${rule1Name}_${rule2Name}_${op}`,
      ruleAST: combinedAST,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while combining rules" });
  }
};
exports.evaluateRule = async (req, res) => {
  try {
    const { ruleName, data } = req.body;
    const rule = await Rule.findOne({ ruleName });
    if (!rule) {
      return res.status(404).json({ error: "Rule not found" });
    }

    const result = evaluate(rule.ruleAST, data);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
