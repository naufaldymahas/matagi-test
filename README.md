# Matagi's Backend Test

NodeJS CRUD API with express, mysql, typescript, objection, knex, jest, supertest, JSdoc, and swagger-ui-express

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* [NodeJS](https://nodejs.org/en/)
* [NPM](https://www.npmjs.com/)
* [yarn](https://yarnpkg.com/) *optional*

### Installing

Please run this command on your terminal

```
$ git clone https://github.com/naufaldymahas/matagi-test.git
$ cd matagi-test
$ npm install or yarn
```

After that please edit your database connection in **knexfile.ts**
Then execute this command on your terminal to migrating database

```
$ npm run migrate or yarn migrate
```

Finally, start and build the application
```
$ npm run start or yarn start
```

## Usage

* URL: http://localhost:8080
* Navigate to http://localhost:8080/documentation/v1/ for the API documentation

