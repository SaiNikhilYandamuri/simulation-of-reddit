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
});

module.exports = mongoose.model("Post", postSchema);