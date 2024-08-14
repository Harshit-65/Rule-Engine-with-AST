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
   git clone https://github.com/yourusername/rule-engine-with-ast.git
   cd rule-engine-with-ast
