const mongoose = require("mongoose");
const Message = require("../model/Messages");

async function handle_request(msg, callback) {
  const name = msg.name;
  const user1 = msg.user1;
  const message = msg.message;
  console.log(user1);

  const addedmessage = new Message({
    name: name,
    user: user1,
    text: message,
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
