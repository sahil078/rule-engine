import React, { useState, useEffect } from 'react';
import CreateRuleForm from './components/CreateRuleForm';
import RuleList from './components/RuleList';
import CombineRulesForm from './components/CombineRulesForm';
import EvaluateRuleForm from './components/EvaluateRuleForm';
import { getRules } from './api';

function App() {
  const [rules, setRules] = useState([]);

  const refreshRules = async () => {
    try {
      const response = await getRules();
      if (Array.isArray(response.data.rules)) {
        setRules(response.data.rules); // Update if `rules` is an array in response
      } else {
        console.warn("Unexpected data format:", response.data);
        setRules([]);
      }
    } catch (error) {
      console.error("Error fetching rules:", error);
      setRules([]);
    }
  };

  useEffect(() => {
    refreshRules();
  }, []);

  return (
    <div className="App">
      <h1 className='text-center text-lg'>Rule Engine</h1>
      <CreateRuleForm onRuleCreated={refreshRules} />
      <RuleList rules={rules} />
      <CombineRulesForm rules={rules} onRulesCombined={refreshRules} />
      <EvaluateRuleForm />
    </div>
  );
}

export default App;
