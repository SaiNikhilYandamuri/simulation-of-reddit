const mongoose = require("mongoose");

const userMetadataSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    auto: true,
  },
  email: {
    type: String,
    required: true,
  },
  joinRequestedCommunities: {
    type: Array,
  },
  inviteRequestedCommunities: {
    type: Array,
  },
  communities: {
    type: Array,
  },
});

module.exports = mongoose.model("UserMetadata", userMetadataSchema);
