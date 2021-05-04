const mongoose = require("mongoose");
const Community = require("../model/Community");
const UserMetadata = require("../model/UserMetadata");

// User will accept invite to a community.
async function handle_request(msg, callback) {
  // Need to implement images later
  const emailOfUser = msg.email;
  const communityName = msg.communityName;
  for (let i = 0; i < emailOfUser.length; i++) {
    UserMetadata.findOneAndUpdate(
      { email: emailOfUser[i] },
      {
        $push: {
          communities: communityName,
        },
        $pull: {
          joinRequestedCommunities: communityName,
        },
      },
      function (err, doc) {
        if (err) callback(null, "Problem adding community to user metadata");
        Community.findOneAndUpdate(
          { communityName: communityName },
          {
            $push: { members: emailOfUser[i] },
            $pull: { requestedToJoin: emailOfUser[i] },
          },
          function (err, doc) {
            if (err)
              callback(null, "Problem adding community to user metadata");
          }
        );
      }
    );
  }

  callback(null, "Successfully sent request to join the community!");
  // callback(null, "Successfully sent request to join the community!");
}

exports.handle_request = handle_request;
