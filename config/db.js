const { Pool } = require('pg');

// Getting db from environment
require('dotenv').config();

//Connection to Elephant SQL db
const connectionString = process.env.PG_URL
const pool = new Pool({connectionString});

pool
  .connect()
  .then(() => {
    console.log('We have Connected DB Successfully DEVELOPMENT ENVðð¿ð¹ðº ');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = pool;
