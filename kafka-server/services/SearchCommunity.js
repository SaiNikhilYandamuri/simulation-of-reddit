const mongoose = require("mongoose");
const Community = require("../model/Community");
const paginate = require("../../server/utils/pagination");

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
      var result = paginate(communityDetails1, msg.pageNum, msg.pageSize);
      console.log("PRINTING RESULT", result);
      callback(null, result);
      break;
    case "numberOfPosts":
      console.log(sortExpression, "sorting ============================");
      const communityDetails2 = await Community.find({
        communityName: new RegExp(searchString),
      }).sort({ numberOfPosts: -1 });
      var result = paginate(communityDetails2, msg.pageNum, msg.pageSize);
      // console.log(result "community lengthhhh");
      callback(null, result);
      break;
    case "numberOfUpvotesAsc":
      const communityDetails3 = await Community.find({
        communityName: new RegExp(searchString),
      }).sort({ numberOfUpvotes: -1 });
      var result = paginate(communityDetails3, msg.pageNum, msg.pageSize);
      callback(null, result);
      break;
    case "numberOfUpvotesDesc":
      const communityDetails4 = await Community.find({
        communityName: new RegExp(searchString),
      }).sort({ numberOfUpvotes: 1 });
      var result = paginate(communityDetails4, msg.pageNum, msg.pageSize);
      callback(null, result);
      break;
    default:
      const communityDetails5 = await Community.find({
        communityName: new RegExp(searchString),
      }).sort({ creationTime: -1 });
      console.log("I am here");
      var result = paginate(communityDetails5, msg.pageNum, msg.pageSize);

      callback(null, result);
  }
}

exports.handle_request = handle_request;
