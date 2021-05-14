const mongoose = require("mongoose");
const UserMetadata = require("../model/UserMetadata");

async function handle_request(msg, callback) {
  // Need to implement images later
  const email = msg.email;

  UserMetadata.findOne({ email: email }, (error, userDetails) => {
    if (error) {
      callback(null, error);
    }
    if (userDetails) {
      console.log(userDetails);
      callback(null, userDetails.inviteRequestedCommunities);
    }
  });
}

exports.handle_request = handle_request;
