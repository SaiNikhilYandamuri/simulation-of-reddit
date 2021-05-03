const mongoose = require("mongoose");
const Message = require("../model/Messages");

async function handle_request(msg, callback) {
  const senderEmail = msg.senderEmail;
  const recieverEmail = msg.recieverEmail;
  const message = msg.message;

  const addedmessage = new Message({
    senderEmail: senderEmail,
    recieverEmail: recieverEmail,
    message: message,
  });
  console.log("Inside add message");
  console.log(addedmessage);

  await addedmessage.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      callback(null, { message: "Message added" });
    }
  });
}

exports.handle_request = handle_request;
