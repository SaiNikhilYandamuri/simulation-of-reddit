const mongoose = require("mongoose");
const Comment = require("../model/Comment");
const Community = require("../model/Community");

async function handle_request(msg, callback) {
  const commentString = msg.comment;
  const commentedBy = msg.commentedBy;
  const postId = mongoose.Types.ObjectId(msg.postId);
  const parentId = msg.parentId;

  const commentObject = new Comment({
    comment: commentString,
    commentedBy: commentedBy,
    parentId: parentId,
  });

  console.log(commentObject);

  await commentObject.save(function (err, result) {
    if (err) {
      callback(null, err);
    } else {
      callback(null, { message: "Commented Added" });
    }
  });
}

exports.handle_request = handle_request;
