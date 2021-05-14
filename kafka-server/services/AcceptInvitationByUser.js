const mongoose = require("mongoose");
const Community = require("../model/Community");
const UserMetadata = require("../model/UserMetadata");

// User will accept invite to a community.
async function handle_request(msg, callback) {
  // Need to implement images later
  console.log(msg);
  const emailOfUser = msg.email;
  const communityName = msg.communityName;
  console.log("Kafka Request!!!!");

  UserMetadata.findOneAndUpdate(
    { email: emailOfUser },
    {
      $push: {
        communities: communityName,
      },
      $pull: {
        inviteRequestedCommunities: communityName,
      },
    },
    function (err, doc) {
      console.log(doc);
      if (err) callback(null, "Problem adding community to user metadata");
      Community.findOneAndUpdate(
        { communityName: communityName },
        { $push: { members: emailOfUser } },
        function (err, doc) {
          console.log(doc);
          if (err) callback(null, "Problem adding community to user metadata");
          callback(null, "Accept invite successful");
        }
      );
      // callback(null, "Accept invite successful");
    }
  );
  // callback(null, "Successfully sent request to join the community!");
}

exports.handle_request = handle_request;
