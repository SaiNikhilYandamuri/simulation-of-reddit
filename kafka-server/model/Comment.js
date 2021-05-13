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
  numberOfUpvotes: {
    type: Number,
    default: 0,
  },
  numberOfDownvotes: {
    type: Number,
    default: 0,
  },
  upvoteMembers: {
    type: Array,
    default: [],
  },
  downvoteMembers: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Comment", commentSchema);
