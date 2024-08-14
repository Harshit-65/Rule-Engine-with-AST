# Rule Engine with AST

This project is a Rule Engine that allows dynamic creation, combination, and evaluation of rules based on user attributes such as age, department, income, and experience. The rules are represented using Abstract Syntax Trees (ASTs), enabling flexible and powerful rule-based logic.

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
- **Testing:** Mocha, Chai
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

***Accessing the Application***
- Open a browser and navigate to http://localhost:3000.
- You will see a UI with options to create, combine, and evaluate rules.

***Creating a Rule***
- Click on Create Rule.
- Enter a rule name and the rule string (e.g., (age > 30 AND department = 'Sales') OR (salary > 50000)).
- Submit to create the rule.

***Combining Rules***
- Click on Combine Rules.
- Select existing rules from the dropdown or enter the rule names.
- Choose a logical operator (e.g., AND, OR).
- Submit to combine the rules.

***Evaluating a Rule***
- Click on Evaluate Rule.
- Select a rule to evaluate.
- Enter the JSON data (e.g., { "age": 35, "department": "Sales", "salary": 60000 }).
- Submit to see the evaluation result.


