"use strict";
const mysql = require("mysql");
const {
  mysqlHost,
  mysqlUser,
  mysqlPassowrd,
  myqlDatabase,
  mysqlPort,
} = require("../../server/utils/config");

const pool = mysql.createPool({
  connectionLimit: 100,
  host: mysqlHost,
  user: mysqlUser,
  port: mysqlPort,
  password: mysqlPassowrd,
  database: myqlDatabase,
});

pool.getConnection((err) => {
  if (err) {
    throw "Error Occured: " + err;
  } else {
    console.log("MySQL Database Connected");
  }
});
module.exports = pool;
