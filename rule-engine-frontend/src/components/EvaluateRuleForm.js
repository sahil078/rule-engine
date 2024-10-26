import React, { useState } from 'react';
import { evaluateRule } from '../api';

const EvaluateRuleForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    department: '',
    salary: '',
    experience: '',
  });
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await evaluateRule(formData); // Make sure evaluateRule function returns a response object
      const isEligible = response.data?.result; // Use optional chaining to avoid undefined errors
      setResult(isEligible ? 'User is eligible' : 'User is not eligible');
    } catch (error) {
      console.error(error); // Log error for debugging
      alert('Error evaluating rule');
    }
  };
  
  
  

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="w-1/2 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Evaluate Rule</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            placeholder="Department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="number"
            placeholder="Salary"
            value={formData.salary}
            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="number"
            placeholder="Experience"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Evaluate Rule
          </button>
        </form>
        {result && <p className="mt-4 text-lg">{result}</p>}
      </div>
    </div>
  );
};

export default EvaluateRuleForm;
