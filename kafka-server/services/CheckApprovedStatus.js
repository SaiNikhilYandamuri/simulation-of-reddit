const mongoose = require("mongoose");
const Community = require("../model/Community");
const UserMetadata = require("../model/UserMetadata");

async function handle_request(msg, callback) {
  // Need to implement images later
  const communityName = msg.communityName;
  const email = msg.email;
  console.log("Inside Approved Status Kafka Service");

  UserMetadata.findOne({ email: email }, function (err, doc) {
    console.log(doc.communities);
    if (
      doc.communities.includes(communityName) &&
      !doc.joinRequestedCommunities.includes(communityName) &&
      !doc.inviteRequestedCommunities.includes(communityName)
    ) {
      callback(null, "Permission granted");
    } else {
      if (doc.joinRequestedCommunities.includes(communityName)) {
        callback(null, "Admin yet to give approval");
      } else if (doc.inviteRequestedCommunities.includes(communityName)) {
        callback(null, "You are yet to accept invite");
      }
    }
    callback(null, "You don't have permission");
  });
}

exports.handle_request = handle_request;
