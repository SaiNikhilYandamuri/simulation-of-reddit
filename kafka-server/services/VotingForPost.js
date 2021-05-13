const mongoose = require("mongoose");
const Post = require("../model/Post");
// const UserMetadata = require("../model/UserMetadata");

async function handle_request(msg, callback) {
  const emailOfUser = msg.email;
  const id = msg.id;
  const vote = msg.voteString.toLowerCase();

  console.log("Inside Voting for Post");
  console.log("here");

  if (vote === "upvote") {
    const postDetails = await Post.findOne({
      _id: id,
    });
    if (postDetails.upvoteMembers.includes(emailOfUser)) {
      Post.findOneAndUpdate(
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
          callback(null, "Upvoted completed for Post");
        }
      );
    } else if (postDetails.downvoteMembers.includes(emailOfUser)) {
      Post.findOneAndUpdate(
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
          callback(null, "Upvoted completed for Post");
        }
      );
    } else {
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
          callback(null, "Upvoted completed for Post");
        }
      );
    }
  } else if (vote === "downvote") {
    const postDetails = await Post.findOne({
      _id: id,
    });
    console.log(postDetails.upvoteMembers.includes(emailOfUser));
    if (postDetails.upvoteMembers.includes(emailOfUser)) {
      Post.findOneAndUpdate(
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
          callback(null, "Downvoted completed for Post");
        }
      );
    } else if (postDetails.downvoteMembers.includes(emailOfUser)) {
      Post.findOneAndUpdate(
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
          callback(null, "Downvoted completed for Post");
        }
      );
    } else {
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
          callback(null, "Downvoted completed for Post");
        }
      );
    }
  }
}

exports.handle_request = handle_request;
