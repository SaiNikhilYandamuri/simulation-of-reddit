const mongoose = require("mongoose");
const Message = require("../model/Messages");

async function handle_request(msg, callback) {
  // Need to implement images later
  console.log(msg);
  const name = msg.name;
  const user1 = msg.user;

  console.log("Inside get message");

  Message.find({
    $or: [
      { name: name, user: user1 },
      { user: user1, name: name },
    ],
  })
    .select({ name: 1, text: 1, user: 1 })
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
