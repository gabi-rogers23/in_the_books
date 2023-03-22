const { Pool } = require("pg");
require("dotenv").config();

<<<<<<< HEAD
const connectionString = process.env.DATABASE_URL  
// || 'https://localhost:5432/in-the-books' ;
console.log("connection string error", connectionString)
=======
const connectionString = process.env.DATABASE_URL 

>>>>>>> 29cb861fabc365df948871ae03a781ccfb3475c0
const client = new Pool({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = client;
