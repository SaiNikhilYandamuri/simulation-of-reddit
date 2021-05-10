const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    auto: true,
  },
  comment: {
    type: String,
    auto: true,
  },
  commentedBy: {
    type: String,
    required: true,
  },
  parentId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  creationTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
