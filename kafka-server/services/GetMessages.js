const mongoose = require("mongoose");
const Message = require("../model/Messages");

async function handle_request(msg, callback) {
  // Need to implement images later
  console.log(msg);
  const senderEmail = msg.senderEmail;
  const recieverEmail = msg.recieverEmail;

  console.log("Inside get message");
  console.log(senderEmail);
  console.log(recieverEmail);

  Message.find({
    $or: [
      { senderEmail: senderEmail, recieverEmail: recieverEmail },
      { senderEmail: recieverEmail, recieverEmail: senderEmail },
    ],
  })
    .lean()
    .select({ senderEmail: 1, message: 1 })
    .sort({ created_time: -1 })
    .then((error, result) => {
      if (error) {
        callback(null, error);
      } else {
        console.log("Inside Else of result");
        console.log(result);
        callback(null, result);
      }
    });
}

exports.handle_request = handle_request;
