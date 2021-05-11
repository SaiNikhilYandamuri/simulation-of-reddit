const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  createdByEmail: {
    type: String,
    required: true,
  },
  communityName: {
    type: String,
    required: true,
  },
  postTitle: {
    type: String,
  },
  flag: {
    type: String,
  },
  url: {
    type: String,
  },
  text: {
    type: String,
  },
  images: {
    type: Array,
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

module.exports = mongoose.model("Post", postSchema);
