const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  
  senderName: {
    type: String,
    required: true,
  },
  recieverName: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  created_time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", messageSchema);