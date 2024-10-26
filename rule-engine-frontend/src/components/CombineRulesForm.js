import React, { useState } from 'react';
import { combineRules } from '../api';

const CombineRulesForm = ({ rules = [], onRulesCombined }) => {
  const [selectedRules, setSelectedRules] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Selected Rules:", selectedRules); // Debugging line
    try {
      await combineRules(selectedRules);
      onRulesCombined(); // Trigger refresh after combining
      alert("Rules Combined Successfully");
    } catch (error) {
      console.error("Error combining rules:", error); // Debugging line
      alert('Error combining rules');
    }
  };

  const handleCheckboxChange = (ruleId) => {
    setSelectedRules((prev) =>
      prev.includes(ruleId) ? prev.filter((id) => id !== ruleId) : [...prev, ruleId]
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Combine Rules</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Array.isArray(rules) && rules.length > 0 ? (
          rules.map((rule, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                value={rule._id}
                onChange={() => handleCheckboxChange(rule._id)}
                className="mr-2 h-5 w-5"
              />
              <label className="text-gray-700">{rule.description || rule._id}</label> {/* Change to display rule description if available */}
            </div>
          ))
        ) : (
          <p>No rules available to combine.</p>
        )}
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={selectedRules.length === 0}
        >
          Combine Selected Rules
        </button>
      </form>
    </div>
  );
};

export default CombineRulesForm;
