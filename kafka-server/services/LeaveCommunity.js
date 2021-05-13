const mongoose = require("mongoose");
const UserMetadata = require("../model/UserMetadata");
const Community = require("../model/Community");
async function handle_request(msg, callback) {
  const email = msg.email;
  const communityName = msg.communityName;
  UserMetadata.findOneAndUpdate(
    { email: email },
    {
      $pull: {
        communities: communityName,
      },
    },
    (error, result) => {
      if (error) {
        callback(null);
      } else {
        console.log("Inside else");
        Community.findOneAndUpdate(
          { communityName: communityName },
          { $pull: { members: email } },
          (error, result) => {
            callback(null, "Leave Community completed");
          }
        );
      }
    }
  );
}

exports.handle_request = handle_request;
