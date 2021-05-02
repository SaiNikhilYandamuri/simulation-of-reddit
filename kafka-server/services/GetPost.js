const mongoose = require("mongoose");
const Post = require("../model/Post");

async function handle_request(msg, callback) {
  // Need to implement images later
  console.log(msg);
  

//   Post.find(
//     {$or:[{senderEmail: senderEmail,recieverEmail:recieverEmail},{senderEmail:recieverEmail,recieverEmail:senderEmail}]}).sort({"created_time":-1}).then((error, result) => {
//       if (error) {
//         callback(null, error);
//       } else {
//         console.log("Inside Else of result");
//         console.log(result);
//         callback(null, result);
//       }
//     });

}

exports.handle_request = handle_request;