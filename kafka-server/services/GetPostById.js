const mongoose = require("mongoose");
const Post = require("../model/Post");
const User = require("../model/UserMetadata");

async function handle_request(msg, callback) {
  // Need to implement images later
  const postId = msg.postId;

  Post.findById(postId).then((result, error) => {
    if (error) {
      callback(null, error);
    } else {
      console.log("Inside Else of result");
      console.log(result);

      callback(null, result);
    }
  });
}

exports.handle_request = handle_request;
