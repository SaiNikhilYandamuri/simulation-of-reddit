const mongoose = require("mongoose");
const Community = require("../model/Community");
const User = require("../model/UserMetadata");

async function handle_request(msg, callback) {
  // Need to implement images later
  console.log(msg);
  const communityName = msg.communityName;
//   const recieverEmail = msg.recieverEmail;

//   console.log("Inside get message");
  console.log(communityName);
//   console.log(recieverEmail);

Community.find(
    {communityName: communityName},{requestedToJoin:1}).sort({"creationTime":-1}).then((result,error) => {
      if (error) {
        callback(null, error);
      } else {
        console.log("Inside Else of result");
        console.log(result[0].requestedToJoin);



        callback(null, result[0].requestedToJoin);
      }
    });

}

exports.handle_request = handle_request;