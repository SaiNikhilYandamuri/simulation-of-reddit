const mongoose = require("mongoose");
const Community = require("../model/Community");
const UserMetadata = require("../model/UserMetadata");

// Adming will invite n number of users to join a community
async function handle_request(msg, callback) {
  // Need to implement images later
  const emailOfUser = msg.email;
  const communityName = msg.communityName;
  emailOfUser.forEach((element) => {
    UserMetadata.findOneAndUpdate(
      { email: element },
      {
        $push: {
          inviteRequestedCommunities: communityName,
        },
      },
      function (err, doc) {
        if (err) callback(null, "Problem adding community to user metadata");
        callback(null, "Successfully sent request to join the community!");
      }
    );
  });
  callback(null, "Successfully sent request to join the community!");
}

exports.handle_request = handle_request;
