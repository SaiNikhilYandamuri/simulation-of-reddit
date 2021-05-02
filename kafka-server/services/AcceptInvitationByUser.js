const mongoose = require("mongoose");
const Community = require("../model/Community");
const UserMetadata = require("../model/UserMetadata");

async function handle_request(msg, callback) {
  // Need to implement images later
  const emailOfUser = msg.email;
  const communityName = msg.communityName;
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
      if (err) callback(null, "Problem adding community to user metadata");
      Community.findByIdAndUpdate(
        { communityName: communityName },
        { $push: { members: emailOfUser } },
        function (err, doc) {
          if (err) callback(null, "Problem adding community to user metadata");
          callback(null, "Accept invite successful");
        }
      );
      callback(null, "Accept invite successful");
    }
  );
  // callback(null, "Successfully sent request to join the community!");
}

exports.handle_request = handle_request;
