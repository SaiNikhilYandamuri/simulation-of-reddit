const mongoose = require("mongoose");
const Comment = require("../model/Comment");
// const UserMetadata = require("../model/UserMetadata");

async function handle_request(msg, callback) {
  const emailOfUser = msg.email;
  const id = msg.id;
  const vote = msg.voteString.toLowerCase();

  console.log("Inside Voting for comment");
  console.log("here");

  if (vote === "upvote") {
    const commentDetails = await Comment.findOne({
      _id: id,
    });
    if (commentDetails.upvoteMembers.includes(emailOfUser)) {
      Comment.findOneAndUpdate(
        { _id: id },
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
          callback(null, "Upvoted completed for comment");
        }
      );
    } else if (commentDetails.downvoteMembers.includes(emailOfUser)) {
      Comment.findOneAndUpdate(
        { _id: id },
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
          callback(null, "Upvoted completed for comment");
        }
      );
    } else {
      Comment.findOneAndUpdate(
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
          callback(null, "Upvoted completed for comment");
        }
      );
    }
  } else if (vote === "downvote") {
    const commentDetails = await Comment.findOne({
      _id: id,
    });
    console.log(commentDetails.upvoteMembers.includes(emailOfUser));
    if (commentDetails.upvoteMembers.includes(emailOfUser)) {
      Comment.findOneAndUpdate(
        { _id: id },
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
          callback(null, "Downvoted completed for comment");
        }
      );
    } else if (commentDetails.downvoteMembers.includes(emailOfUser)) {
      Comment.findOneAndUpdate(
        { _id: id },
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
          callback(null, "Downvoted completed for comment");
        }
      );
    } else {
      Comment.findOneAndUpdate(
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
          callback(null, "Downvoted completed for comment");
        }
      );
    }
  }
}

exports.handle_request = handle_request;
