const mongoose = require("mongoose");
//const Community = require("../model/Community");
const pool = require("../../server/utils/mysqlConnection");

async function handle_request(msg, callback) {
  let email = msg.email;
  console.log("GOt email in callback fn",email)
  const profileQuery = "select * from User where email=?";
  pool.query(profileQuery, [email], (err, result) => {
  console.log("Got query result1111")
  if (err) {
    console.log("In error",err)
    callback(null, error);
  } else {
    callback(null, result);
  }
}
  )
}
 

exports.handle_request = handle_request;