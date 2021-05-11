const mongoose = require("mongoose");
const Comment = require("../model/Comment");
const Community = require("../model/Community");

async function handle_request(msg, callback) {
  const parentId = msg.parentId;

  await Comment.find({ parentId: parentId }).then((result, error) => {
    if (error) {
      callback(null, error);
    } else {
      callback(null, result);
    }
  });
}

exports.handle_request = handle_request;
