const mongoose = require("mongoose");
const Messages = require("../model/Messages");

async function handle_request(msg, callback) {
  // Need to implement images later
  const senderEmail = msg.senderEmail;
  const recieverEmail = msg.recieverEmail;

  console.log("Inside get message");
  console.log(senderEmail);
  console.log(recieverEmail);

  Messages.find(
    {
      $and: [
        { senderEmail: { senderEmail } },
        { recieverEmail: { recieverEmail } },
      ],
    },
    (error, result) => {
      if ((error, result)) {
        callback(null, error);
      } else {
        console.log(result);
        callback(null, result);
      }
    }
  );

}

exports.handle_request = handle_request;
