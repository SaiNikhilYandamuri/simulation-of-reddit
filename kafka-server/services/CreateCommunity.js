const mongoose = require("mongoose");
const Community = require("../model/Community");
const UserMetadata = require("../model/UserMetadata");

async function handle_request(msg, callback) {
  // Need to implement images later
  const communityName = msg.communityName;
  const description = msg.description;
  const rules = msg.rules;
  const email = msg.createdBy;
  const community = new Community({
    communityName: communityName,
    description: description,
    rules: rules,
    createdBy: email,
    members: email,
  });
  console.log("Inside Community");
  console.log(community);

  Community.findOne(
    { communityName: communityName },
    (error, communityDetails) => {
      if (error) {
        callback(null, error);
      }
      console.log(communityDetails);
      if (communityDetails) {
        callback(null, "Community with the name already exists");
      } else {
        community.save(async (error, data) => {
          if (error) {
            callback(null, error);
          } else {
            UserMetadata.findOneAndUpdate(
              { email: email },
              { $push: { communities: communityName } },
              (error, result) => {
                callback(null, "Succesfully created.");
              }
            );
          }
        });
      }
    }
  );
}

exports.handle_request = handle_request;
