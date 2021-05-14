const mongoose = require("mongoose");
const pool = require("../../server/utils/mysqlConnection");
const bcrypt = require("bcrypt");

async function handle_request(msg, callback) {
  let email = msg.email;
  let name = msg.name;
  // let password=msg.password;
  let gender = msg.gender;
  let location = msg.location;
  let description = msg.description;
  // var updated_password=await bcrypt.hash(password, 10)
  // console.log("Password after hash", updated_password);

  const updateProfile =
    "UPDATE User SET name=?,gender=?,location=?,description=? where email=?";

  pool.query(
    updateProfile,
    [name, gender, location, description, email],
    (err, result) => {
      console.log("Got query res");
      if (err) {
        console.log("In error", err);
        callback(null, error);
      } else {
        callback(null, result);
      }
    }
  );
}

exports.handle_request = handle_request;
