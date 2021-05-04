const mongoose = require("mongoose");
const Community = require("../model/Community");

async function handle_request(msg, callback) {
  // Need to implement images later
  const searchString = msg.searchString;
  console.log(searchString);
  console.log("Hello");
  const search = "/" + searchString + "/";
  console.log(search);
  const sortExpression = msg.sort;

  switch (sortExpression) {
    case "numberOfMembers":
      const communityDetails1 = await Community.find({
        communityName: new RegExp(searchString),
      }).sort({ numberOfMembers: -1 });
      callback(null, communityDetails1);
      break;
    case "numberOfPosts":
      const communityDetails2 = await Community.find({
        communityName: new RegExp(searchString),
      }).sort({ numberOfPosts: -1 });
      callback(null, communityDetails2);
      break;
    case "numberOfUpvotesAsc":
      const communityDetails3 = await Community.find({
        communityName: new RegExp(searchString),
      }).sort({ numberOfUpvotes: -1 });
      callback(null, communityDetails3);
      break;
    case "numberOfUpvotesDesc":
      const communityDetails4 = await Community.find({
        communityName: new RegExp(searchString),
      }).sort({ numberOfUpvotes: 1 });
      callback(null, communityDetails4);
      break;
    default:
      const communityDetails5 = await Community.find({
        communityName: new RegExp(searchString),
      }).sort({ creationTime: -1 });
      callback(null, communityDetails5);
  }
}

exports.handle_request = handle_request;
