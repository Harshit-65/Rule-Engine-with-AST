const express = require("express");
const router = express.Router();
const Controller = require("../controllers/Controller");

router.post("/evaluate_rule", Controller.evaluateRule);
router.post("/combine_rules", Controller.combineRules);
router.post("/create_rule", Controller.createRule);

module.exports = router;
