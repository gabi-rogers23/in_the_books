const { Pool } = require("pg");
require("dotenv").config();

const connectionString = 'https://localhost:5432/in-the-books';
// process.env.DATABASE_URL 

const client = new Pool({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = client;
