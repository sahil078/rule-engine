import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const createRule = (ruleString) => {
  return axios.post(`${API_BASE_URL}/create_rule`, { ruleString });
};

export const getRules = () => {
  return axios.get(`${API_BASE_URL}/rules`);
};

export const combineRules = (ruleIds) => {
  return axios.post(`${API_BASE_URL}/combine_rules`, { ruleIds });
};

export const evaluateRule = (data) => {
  return axios.post(`${API_BASE_URL}/evaluate_rule`, data);
};
