const mongoose = require("mongoose");
const Community = require("../model/Community");
const UserMetadata = require("../model/UserMetadata");

async function handle_request(msg, callback) {
  const emailOfUser = msg.email;
  const communityName = msg.communityName;
  const vote = msg.voteString.toLowerCase();

  if (vote === "upvote") {
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
  } else if (vote === "downvote") {
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

exports.handle_request = handle_request;
