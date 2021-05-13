const mongoose = require("mongoose");
const Community = require("../model/Community");
const UserMetadata = require("../model/UserMetadata");

async function handle_request(msg, callback) {
  // Need to implement images later
  const communityName = msg.communityName;

  console.log("Inside Community");
  // console.log(community);

  const members = await Community.findOne({
    communityName: communityName,
  }).select({ members: 1 });
  console.log(members);
  members.members.forEach(async (element) => {
    await UserMetadata.findOneAndUpdate(
      { email: element },
      { $pull: { communities: communityName } }
    );
  });

  Community.remove({ communityName: communityName }, (err, result) => {
    if (err) {
      callback(null, error);
    }
    if (result) {
      callback(null, "Deleted Community");
    }
  });
}

exports.handle_request = handle_request;
