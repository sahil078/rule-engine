// models/Rule.js
const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
  ruleString: { type: String, required: true },
  ast: { type: Object, required: true },  // Store the AST as an object
}, { timestamps: true });

const Rule = mongoose.model('Rule', ruleSchema);

module.exports = Rule;
