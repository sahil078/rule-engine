import React, { useEffect, useState } from 'react';
import { getRules } from '../api';

const RuleList = () => {
  const [rules, setRules] = useState([]);
  const [error, setError] = useState(null); // New state for error handling

  useEffect(() => {
    async function fetchRules() {
      try {
        const response = await getRules();
        console.log('Fetched rules:', response.data); // Debugging log
        if (Array.isArray(response.data.rules)) {
          setRules(response.data.rules);
        } else {
          throw new Error('Unexpected data format');
        }
      } catch (err) {
        setError(err.message);
      }
    }
    fetchRules();
  }, [setRules]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="mt-6 p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Existing Rules</h2>
      <ul className="list-disc pl-5">
        {rules.map((rule, index) => (
          <li key={index} className="py-2 border-b border-gray-200 text-black">
            {rule}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RuleList;
