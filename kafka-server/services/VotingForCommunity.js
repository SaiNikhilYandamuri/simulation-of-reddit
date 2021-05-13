const mongoose = require("mongoose");
const Community = require("../model/Community");
const UserMetadata = require("../model/UserMetadata");

async function handle_request(msg, callback) {
  const emailOfUser = msg.email;
  const communityName = msg.communityName;
  const vote = msg.voteString.toLowerCase();

  console.log("Inside Voting for community");

  if (vote === "upvote") {
    const communityDetails = await Community.findOne({
      communityName: communityName,
    });
    if (communityDetails.upvoteMembers.includes(emailOfUser)) {
      Community.findOneAndUpdate(
        { communityName: communityName },
        {
          $pull: {
            upvoteMembers: emailOfUser,
          },
          $inc: {
            numberOfUpvotes: -1,
          },
        },
        function (err, doc) {
          if (err) callback(null, err);
          console.log("Inside Upvote");
          console.log(doc);
          callback(null, "Upvoted completed for community");
        }
      );
    } else if (communityDetails.downvoteMembers.includes(emailOfUser)) {
      Community.findOneAndUpdate(
        { communityName: communityName },
        {
          $pull: {
            downvoteMembers: emailOfUser,
          },
          $inc: {
            numberOfDownvotes: -1,
          },
        },
        function (err, doc) {
          if (err) callback(null, err);
          console.log("Inside Upvote");
          console.log(doc);
          callback(null, "Upvoted completed for community");
        }
      );
    } else {
      Community.findOneAndUpdate(
        { communityName: communityName },
        {
          $push: {
            upvoteMembers: emailOfUser,
          },
          $inc: {
            numberOfUpvotes: 1,
          },
        },
        function (err, doc) {
          if (err) callback(null, err);
          console.log("Inside Upvote");
          console.log(doc);
          callback(null, "Upvoted completed for community");
        }
      );
    }
  } else if (vote === "downvote") {
    const communityDetails = await Community.findOne({
      communityName: communityName,
    });
    console.log(communityDetails.upvoteMembers.includes(emailOfUser));
    if (communityDetails.upvoteMembers.includes(emailOfUser)) {
      Community.findOneAndUpdate(
        { communityName: communityName },
        {
          $pull: {
            upvoteMembers: emailOfUser,
          },
          $inc: {
            numberOfUpvotes: -1,
          },
        },
        function (err, doc) {
          if (err) callback(null, err);
          console.log("Inside Upvote");
          console.log(doc);
          callback(null, "Downvoted completed for community");
        }
      );
    } else if (communityDetails.downvoteMembers.includes(emailOfUser)) {
      Community.findOneAndUpdate(
        { communityName: communityName },
        {
          $pull: {
            downvoteMembers: emailOfUser,
          },
          $inc: {
            numberOfDownvotes: -1,
          },
        },
        function (err, doc) {
          if (err) callback(null, err);
          console.log("Inside Upvote");
          console.log(doc);
          callback(null, "Downvoted completed for community");
        }
      );
    } else {
      Community.findOneAndUpdate(
        { communityName: communityName },
        {
          $push: {
            downvoteMembers: emailOfUser,
          },
          $inc: {
            numberOfDownvotes: 1,
          },
        },
        function (err, doc) {
          if (err) callback(null, err);
          callback(null, "Downvoted completed for community");
        }
      );
    }
  }
}

exports.handle_request = handle_request;
