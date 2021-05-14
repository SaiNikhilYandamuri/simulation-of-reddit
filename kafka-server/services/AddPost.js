const mongoose = require("mongoose");
const Post = require("../model/Post");
const Community = require("../model/Community");

async function handle_request(msg, callback) {
  console.log("123");
  const createdByEmail = msg.createdByEmail;
  const communityName = msg.communityName;
  const postTitle = msg.postTitle;
  const flag = msg.flag;
  const images = msg.images;
  const url = msg.url;
  const text = msg.text;
  console.log("inside create abcd");
  console.log(flag);

  if (flag === "image") {
    const post = new Post({
      createdByEmail: createdByEmail,
      communityName: communityName,
      postTitle: postTitle,
      images: images,
      flag: flag,
    });

    console.log(post);
    await post.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        Community.findOneAndUpdate(
          { communityName },
          { $inc: { numberOfPosts: 1 } },
          function (err, doc) {
            if (err) {
              callback(null, err);
            } else {
              callback(null, { message: "Post added" });
            }
          }
        );
        // callback(null, { message: "Post added" });
      }
    });
  } else if (flag === "url") {
    const post = new Post({
      createdByEmail: createdByEmail,
      communityName: communityName,
      postTitle: postTitle,
      url: url,
      flag: flag,
    });

    console.log(post);
    await post.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        Community.findOneAndUpdate(
          { communityName },
          { $inc: { numberOfPosts: 1 } },
          function (err, doc) {
            if (err) {
              callback(null, err);
            } else {
              callback(null, { message: "Post added" });
            }
          }
        );
        // callback(null, { message: "Post added" });
      }
    });
  } else if (flag === "text") {
    const post = new Post({
      createdByEmail: createdByEmail,
      communityName: communityName,
      postTitle: postTitle,
      text: text,
      flag: flag,
    });

    console.log(post);
    await post.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        Community.findOneAndUpdate(
          { communityName },
          { $inc: { numberOfPosts: 1 } },
          function (err, doc) {
            if (err) {
              callback(null, err);
            } else {
              callback(null, { message: "Post added" });
            }
          }
        );
        // callback(null, { message: "Post added" });
      }
    });
  }
}

exports.handle_request = handle_request;
