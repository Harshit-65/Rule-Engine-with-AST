const express = require("express");
const router = express.Router();
const Controller = require("../controllers/Controller");

router.post("/create_rule", Controller.createRule);
router.post("/combine_rules", Controller.combineRules);
router.post("/evaluate_rule", Controller.evaluateRule);

module.exports = router;
