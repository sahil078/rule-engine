### 🌟 Rule Evaluation App
The Rule Evaluation Application is a powerful tool for creating, combining, and evaluating complex rules based on user data. Built with Node.js, Express, React, and MongoDB, it offers a flexible, interactive interface to manage eligibility checks efficiently.

<!-- Add a link to a GIF or image showcasing the app here -->

### 📋 Table of Contents
1. ✨ Features
2. 🚀 Installation
3. 🌐 Usage
4. 🔒 API Endpoints
5. 🎨 Project Structure
6. ⚙️ Dependencies

### Features
Rule Creation: Define custom rules with conditional logic on user attributes.
- Rule Combination: Merge rules using AND/OR operators to create complex conditions.
- AST Parsing: Uses an Abstract Syntax Tree (AST) for optimized rule parsing and evaluation.
- Eligibility Checker: Instantly determines if users meet specific eligibility requirements.
- RESTful API: A robust backend API to manage rule creation, combination, and evaluation.
- Intuitive UI: User-friendly interface for managing and evaluating rules seamlessly.

### ⚙️ Installation
To set up the project locally, ensure you have the prerequisites installed.

## Prerequisites
### **Node.js** (v14 or later)
### **MongoDB** (set up locally or through MongoDB Atlas)
### Git

### Steps to Clone the Repository:

bash
```Copy code
git clone https://github.com/yourusername/rule-evaluation-app.git
cd rule-evaluation-app```

### Backend Setup:

```Navigate to the backend folder:
bash
cd backend```

### Install dependencies:
```bash
npm install
```
### Configure environment variables by creating a .env file:
**env**
- PORT=5000
- MONGO_URI=mongodb://localhost:27017/rule-evaluation
```
Start the backend server:
bash
npm start
The backend server will run at http://localhost:5000.
```
### Frontend Setup:
```
Navigate to the frontend folder:
bash
cd ../frontend
### Install frontend dependencies:
npm install
### Run the development server:
bash
### npm start
The frontend server will run at http://localhost:3000.
```
Usage
Define Rules:

Navigate to the rule creation form, input the desired conditions, and save each rule.
Combine Rules:

Select multiple rules from the list and combine them with AND/OR logic.
Evaluate Rules:

Input user data, select a rule to evaluate, and check the eligibility status instantly.
API Endpoints
Here are the primary backend API endpoints:

### 1. POST /api/combine_rules
Description: Combines multiple rules by their IDs.
```
Request Body:
json
Copy code
{
  "ruleIds": ["id1", "id2", "id3"]
}
Response:
json
Copy code
{
  "combinedRule": { /* Combined rule details */ }
}
```

### 2. POST /api/evaluate_rule
Description: Evaluates a rule against given user data.
```
Request Body:
json
Copy code
{
  "ast": {/* Parsed AST */},
  "data": {/* User data */}
}
Response:
json
Copy code
{
  "result": true // or false based on eligibility
}
```

### 3. GET /api/rules
Description: Fetches all available rules.
```
Response:
json
Copy code
[
  {
    "_id": "ruleId1",
    "name": "Rule 1",
    "conditions": [/* Conditions */]
  },
  // Additional rules
]
```

### Dependencies
- Backend
### Express: For server handling.
### Mongoose: MongoDB ODM for schema and data management.
### body-parser: Middleware for parsing request bodies.

- Frontend
### React: UI framework for the frontend.
### Axios: For handling API requests.
### Tailwind CSS: Optional, for styling the components.
