const mongoose = require("mongoose");
const UserMetadata = require("../model/UserMetadata");
async function handle_request(msg, callback) {
  let email = msg.email;
  UserMetadata.findOne(
    { email: email },
    { communities: 1 },
    (error, result) => {
      if (error) {
        callback(null);
      } else {
        callback(null, result);
      }
    }
  );
}

exports.handle_request = handle_request;
