# Rule Engine with AST

This project is a Rule Engine that allows dynamic creation, combination, and evaluation of rules based on user attributes such as age, department, income, and experience. The rules are represented using Abstract Syntax Trees (ASTs), enabling flexible and powerful rule-based logic.

## UPDATE

- Added Bonus Feature to update existing rules - Click on the cleck box "update existing Rule checkbox" in create Rule and write the name of the existing Rule in database and pass the new Rule

## Video Explanation

https://drive.google.com/file/d/1Tys9t2FLO6IBqc8wnIE-vYtXe7zlx7Dm/view?usp=sharing

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [License](#license)

## Features

- **Create Rule:** Allows users to create rules using logical conditions based on attributes.
- **Combine Rules:** Combine multiple rules using logical operators like AND, OR, etc.
- **Evaluate Rule:** Evaluate a rule against given JSON data to check if the conditions are met.
- **AST Representation:** The rules are represented using ASTs, which provides a clear and structured way to define and combine rules.

## Technologies

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose for ORM)
- **Frontend:** HTML, CSS, JavaScript, Bootstrap
- **Testing:** Mocha
- **Deployment:** Express server, MongoDB Atlas

## Installation

### Prerequisites

- Node.js (v14+)
- npm (v6+)
- MongoDB (local instance or MongoDB Atlas)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Harshit-65/Rule-Engine-with-AST.git
   cd Rule-Engine-with-AST

   ```

2. Install the dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a .env file in the root directory and add the following:

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/rule-engine?retryWrites=true&w=majority
PORT=3000
```

Replace <username> and <password> with your MongoDB credentials.

4. Start the server:

```bash
npm start
```

The server will start on http://localhost:3000.

## Usage

**_Accessing the Application_**

- Open a browser and navigate to http://localhost:3000.
- You will see a UI with options to create, combine, and evaluate rules.

**_Creating a Rule_**

- Click on Create Rule.
- Enter a rule name and the rule string (e.g., (age > 30 AND department = 'Sales') OR (salary > 50000)).
- Submit to create the rule.

**_Combining Rules_**

- Click on Combine Rules.
- Select existing rules from the dropdown or enter the rule names.
- Choose a logical operator (e.g., AND, OR).
- Submit to combine the rules.

**_Evaluating a Rule_**

- Click on Evaluate Rule.
- Select a rule to evaluate.
- Enter the JSON data (e.g., { "age": 35, "department": "Sales", "salary": 60000 }).
- Submit to see the evaluation result.

## API Endpoints

### Create Rule

- **Endpoint:** `/api/create_rule`
- **Method:** `POST`
- **Description:** Creates a new rule with the provided rule string and stores its AST representation.
- **Request Body:**

  ```json
  {
    "ruleName": "rule1",
    "ruleString": "(age > 30 AND department = 'Sales') OR (salary > 50000)"
  }
  ```

  **Response:**

```json
{
  "rule": {
    "_id": "60d0fe4f5311236168a109ca",
    "ruleName": "rule1",
    "ruleAST": {
      /* AST Representation */
    }
  }
}
```

### Combine Rules

**Endpoint:** `/api/combine_rules`

**Method:** `POST`

**Description:** Combines two or more rules using a specified logical operator.

**Request Body:**

```json
{
  "rules": ["rule1", "rule2"],
  "op": "AND"
}
```

### Name of the combined file: {rule1}\_{rule2}\_op e.g rule1_rule2_AND

**Response:**

```json
{
  "ruleName": "rule1_rule2_AND",
  "ruleAST": {
    /* Combined AST Representation */
  }
}
```

### Evaluate Rule

**Endpoint:** `/api/evaluate_rule`

**Method:** `POST`

**Description:** Evaluates a rule against provided JSON data.

**Request Body:**

```json
{
  "ruleName": "rule1",
  "data": { "age": 35, "department": "Sales", "salary": 60000 }
}
```

**Response:**

```json
{
  "result": true
}
```

This section completes the API Endpoints part of your `README.md` with the appropriate formatting.

## Testing

To ensure that the Rule Engine functions correctly, a series of test cases have been written using Mocha . These tests cover the creation, combination, and evaluation of rules.

### Running Tests

1. **Ensure the server is not running** or use a separate test database.

2. Run the tests using Mocha:

   ```bash
   npm test
   ```

## Project Structure

Here's an overview of the project's structure:

```bash
   .
├── models
│   └── Rule.js        # Mongoose model for Rule
├── controllers
│   |── controller.js             # rules controller
├── routes
│   └── Route.js       # Express routes for API endpoints
├── tests
│   └── ruleEngine.test.js        # Mocha test cases
├── views
│   └── index.html     # Main HTML view
├── server.js          # Main server file
├── README.md          # Project README file
├── package.json       # NPM package file
└── .env               # Environment variables file
```
