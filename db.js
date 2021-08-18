const mysql = require("mysql");
require("dotenv").config();

const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});
pool.getConnection((err, connection) => {
  if (err) {
    throw err;
  }
  console.log("connected " + connection.threadId);
});
module.exports = pool;
