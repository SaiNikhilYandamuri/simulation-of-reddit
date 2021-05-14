const mongoose = require("mongoose");
const Post = require("../model/Post");
const User = require("../model/UserMetadata");

async function handle_request(msg, callback) {
  // Need to implement images later
  console.log(msg);
  console.log("inside this");
  console.log(msg.userEmail);

  const searchString = msg.searchString;
  console.log(searchString);
  console.log("Hello");
  const search = "/" + searchString + "/";
  console.log(search);
  const sortExpression = msg.sort;

  email = msg.userEmail;
  communityName = msg.communityName;
  joined_community_array = [];

  if (msg.communityName == undefined) {
    console.log("hello community name undefined; changes in this api" + email);
    await User.find({ email: email }).then((result, error) => {
      if (error) {
        console.log("asdf");
        console.log(error);
        callback(null, error);
      } else {
        console.log("Inside Else of result");

        for (let i = 0; i < result[0].communities.length; i++) {
          joined_community_array.push(result[0].communities[i]);
        }

        console.log(joined_community_array);
        // callback(null, joined_community_array);
      }
    });
  } else if (msg.userEmail == undefined) {
    console.log("user undefined");
    joined_community_array.push(communityName);
  }
  console.log("out");
  console.log(joined_community_array);

  posts_array = [];

  switch (sortExpression) {
    case "numberOfUpvotesAsc":
      for (let i = 0; i < joined_community_array.length; i++) {
        await Post.find({ communityName: joined_community_array[i] })
          .sort({ numberOfUpvotes: 1 })
          .then((result, error) => {
            if (error) {
              callback(null, error);
            } else {
              console.log("Inside Else of result");
              console.log(result);
              posts_array = [...posts_array, ...result];
            }
          });
      }
      callback(null, posts_array);
      break;

    case "numberOfUpvotesDesc":
      for (let i = 0; i < joined_community_array.length; i++) {
        await Post.find({ communityName: joined_community_array[i] })
          .sort({ numberOfUpvotes: -1 })
          .then((result, error) => {
            if (error) {
              callback(null, error);
            } else {
              console.log("Inside Else of result");
              console.log(result);
              posts_array = [...posts_array, ...result];
            }
          });
      }
      callback(null, posts_array);
      break;

    case "numberOfDownvotesAsc":
      for (let i = 0; i < joined_community_array.length; i++) {
        await Post.find({ communityName: joined_community_array[i] })
          .sort({ numberOfDownvotes: 1 })
          .then((result, error) => {
            if (error) {
              callback(null, error);
            } else {
              console.log("Inside Else of result");
              console.log(result);
              posts_array = [...posts_array, ...result];
            }
          });
      }
      callback(null, posts_array);
      break;

    case "numberOfDownvotesDesc":
      for (let i = 0; i < joined_community_array.length; i++) {
        await Post.find({ communityName: joined_community_array[i] })
          .sort({ numberOfDownvotes: -1 })
          .then((result, error) => {
            if (error) {
              callback(null, error);
            } else {
              console.log("Inside Else of result");
              console.log(result);
              posts_array = [...posts_array, ...result];
            }
          });
      }
      callback(null, posts_array);
      break;

    default:
      for (let i = 0; i < joined_community_array.length; i++) {
        await Post.find({ communityName: joined_community_array[i] })
          .sort({ createdTime: -1 })
          .then((result, error) => {
            if (error) {
              callback(null, error);
            } else {
              console.log("Inside Else of result");
              console.log(result);
              posts_array = [...posts_array, ...result];
            }
          });
      }
      callback(null, posts_array);
  }
}

exports.handle_request = handle_request;
