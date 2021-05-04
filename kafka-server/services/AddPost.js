const mongoose = require("mongoose");
const Post = require("../model/Post");

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
        callback(null, { message: "Post added" });
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
        console.log("url added post");
        callback(null, { message: "Post added" });
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
        callback(null, { message: "Post added" });
      }
    });
  }

}

exports.handle_request = handle_request;