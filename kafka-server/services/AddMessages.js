const mongoose = require("mongoose");
const Message = require("../model/Messages");

async function handle_request(msg, callback) {
  const senderName = msg.senderName;
  const recieverName = msg.recieverName;
  const message = msg.message;

  const Message = new Message({
    senderName: senderName,
    recieverName: recieverName,
    message: message,
  });
  console.log("Inside add message");
  console.log(Message);

  await Message.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      callback(null, { message: "Message added" });
    }
  });
}

exports.handle_request = handle_request;
