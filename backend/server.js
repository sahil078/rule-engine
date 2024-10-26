// app.js (or server.js)
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Rule = require('./models/Rule');
const cors = require('cors');
const { parseRuleToAST, combineRules, evaluateRule } = require('./helpers/ruleEngineHelpers');

const app = express();

// Enable CORS for all routes
app.use(cors());

// If you want to restrict access to only a specific origin, use this:
app.use(cors({
  origin: 'http://localhost:3000'  // Allow requests only from your frontend
}));

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/rule-engine', { useNewUrlParser: true, useUnifiedTopology: true });

// API to create a rule
app.post('/create_rule', (req, res) => {
  const { ruleString } = req.body;

  try {
    const ast = parseRuleToAST(ruleString);
    const rule = new Rule({ ruleString, ast });

    rule.save()
      .then(result => res.status(201).send(result))
      .catch(err => res.status(500).send(err));
  } catch (error) {
    res.status(400).send({ error: 'Invalid rule string' });
  }
});

// New endpoint to retrieve rules from the database
app.get('/rules', async (req, res) => {
  try {
    const rules = await Rule.find(); // Retrieve all rules from the database
    res.status(200).json({ rules: rules.map(rule => rule.ruleString) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve rules' });
  }
});

// API to combine multiple rules
app.post('/combine_rules', (req, res) => {
  const { rules } = req.body;

  try {
    const combinedAST = combineRules(rules);
    res.status(200).send({ ast: combinedAST });
  } catch (error) {
    res.status(500).send({ error: 'Error combining rules' });
  }
});

// Get all rules
app.get('/rules', (req, res) => {
  Rule.find({})
    .then(rules => res.status(200).send(rules))
    .catch(err => res.status(500).send(err));
});

// API to evaluate a rule
app.post('/evaluate_rule', (req, res) => {
  const { ast, data } = req.body;

  try {
    const result = evaluateRule(ast, data);
    res.status(200).send({ result });
  } catch (error) {
    res.status(400).send({ error: 'Invalid AST or data' });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});



