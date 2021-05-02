const mongoose = require("mongoose");
const Community = require("../model/Community");

async function handle_request(msg, callback) {
  // Need to implement images later
  const communityName = msg.communityName;

  Community.findOne(
    { communityName: communityName },
    (error, communityDetails) => {
      if (error) {
        callback(null, error);
      }
      if (communityDetails) {
        console.log(communityDetails);
        callback(null, communityDetails);
      }
    }
  );
}

exports.handle_request = handle_request;
