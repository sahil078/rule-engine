import React, { useState } from 'react';
import { createRule } from '../api';

const CreateRuleForm = ({ onRuleCreated }) => {
  const [ruleString, setRuleString] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRule(ruleString);
      setRuleString('');
      onRuleCreated(); // Refresh rule list
    } catch (error) {
      alert('Error creating rule');
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Rule</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ruleString}
          onChange={(e) => setRuleString(e.target.value)}
          placeholder="Enter rule"
          required
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Create Rule
        </button>
      </form>
    </div>
  );
};

export default CreateRuleForm;
