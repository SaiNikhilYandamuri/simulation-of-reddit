const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    auto: true,
  },
  communityName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rules: {
    type: Array,
    required: true,
  },
  images: {
    type: Array,
  },
  creationTime: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
    required: true,
  },
  members: {
    type: Array,
  },
  requestedToJoin: {
    type: Array,
  },
  numberOfUpvotes: {
    type: Number,
    default: 0,
  },
  numberOfDownVotes: {
    type: Number,
    default: 0,
  },
  numberOfMembers: {
    type: Number,
    default: 0,
  },
  numberOfPosts: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Community", communitySchema);
