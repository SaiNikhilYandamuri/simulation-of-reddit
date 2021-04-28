const mongoose = require("mongoose");
const Community = require("../model/Community");

async function handle_request(msg, callback) {
  // Need to implement images later
  const searchString = msg.searchString;
  console.log(searchString);
  console.log("Hello");
  const search = "/" + searchString + "/";
  console.log(search);

  Community.find(
    { communityName: new RegExp(searchString) },
    (error, communityDetails) => {
      if (error) {
        console.log("error");
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
