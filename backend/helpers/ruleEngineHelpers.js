const ASTNode = require('../models/ASTNode');

// Helper function to parse a rule string into an AST
function parseRuleToAST(ruleString) {
  // Simplistic parser logic for converting rule strings into AST
  // This can be extended to handle more complex cases and error handling
  
  let tokens = tokenizeRuleString(ruleString); // Tokenize the rule string
  return buildAST(tokens); // Build the AST using tokens
}

// Tokenize rule string into components
function tokenizeRuleString(ruleString) {
  // Tokenizing by splitting on whitespace and operators
  const regex = /(\s+|\(|\)|AND|OR|>|<|=)/g;
  return ruleString.split(regex).filter(token => token.trim().length > 0);
}

// Build an AST from the tokens
function buildAST(tokens) {
  let stack = [];
  let currentNode = null;

  tokens.forEach(token => {
    if (token === '(') {
      stack.push(currentNode);
      currentNode = null;
    } else if (token === ')') {
      let previousNode = stack.pop();
      if (previousNode) {
        if (!previousNode.left) {
          previousNode.left = currentNode;
        } else {
          previousNode.right = currentNode;
        }
        currentNode = previousNode;
      }
    } else if (token === 'AND' || token === 'OR') {
      const operatorNode = new ASTNode('operator', null, null, token);
      operatorNode.left = currentNode;
      currentNode = operatorNode;
    } else {
      const operandNode = parseOperand(token);
      if (currentNode && currentNode.type === 'operator' && !currentNode.right) {
        currentNode.right = operandNode;
      } else {
        currentNode = operandNode;
      }
    }
  });

  return currentNode;
}

// Helper function to create an operand node
function parseOperand(token) {
  let [key, operator, value] = token.split(/\s*(>|<|=)\s*/);
  return new ASTNode('operand', null, null, { key, operator, value });
}

// Helper function to combine multiple ASTs into a single AST
function combineRules(rules) {
  if (!rules || rules.length === 0) return null;

  let combinedAST = null;

  rules.forEach(rule => {
    const ruleAST = parseRuleToAST(rule);

    if (combinedAST) {
      const operatorNode = new ASTNode('operator', combinedAST, ruleAST, 'AND');
      combinedAST = operatorNode;
    } else {
      combinedAST = ruleAST;
    }
  });

  return combinedAST;
}

// Helper function to evaluate an AST against user data
function evaluateRule(ast, data) {
  if (!ast) return false;

  if (ast.type === 'operator') {
    const leftResult = evaluateRule(ast.left, data);
    const rightResult = evaluateRule(ast.right, data);

    if (ast.value === 'AND') {
      return leftResult && rightResult;
    } else if (ast.value === 'OR') {
      return leftResult || rightResult;
    }
  } else if (ast.type === 'operand') {
    return evaluateCondition(ast.value, data);
  }
}

// Evaluate a single condition (operand) against user data
function evaluateCondition(condition, data) {
  const { key, operator, value } = condition;
  const dataValue = data[key];

  switch (operator) {
    case '>':
      return dataValue > value;
    case '<':
      return dataValue < value;
    case '=':
      return dataValue == value;
    default:
      throw new Error(`Invalid operator: ${operator}`);
  }
}

module.exports = {
  parseRuleToAST,
  combineRules,
  evaluateRule,
};
