const mongoose = require("mongoose");
const Post = require("../model/Post");
// const UserMetadata = require("../model/UserMetadata");

async function handle_request(msg, callback) {
  const emailOfUser = msg.email;
  const id = msg.id;
  const vote = msg.voteString.toLowerCase();
  console.log(emailOfUser);
  if (vote === "upvote") {
    Post.findOneAndUpdate(
      { _id: id },
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
        callback(null, "Upvoted completed for post");
      }
    );
  } else if (vote === "downvote") {
    Post.findOneAndUpdate(
      { _id: id },
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
        callback(null, "Downvoted completed for post");
      }
    );
  }
}

exports.handle_request = handle_request;
