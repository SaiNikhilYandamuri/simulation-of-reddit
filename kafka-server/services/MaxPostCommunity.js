const mongoose = require("mongoose");
const Community = require("../model/Community");

async function handle_request(msg, callback) {
  user_email=msg.user_email
  await Community.find({createdBy:user_email},{communityName:1,numberOfPosts:1}).sort({numberOfPosts:-1})
    .then((result, error) => {
        console.log("YOLO")
        console.log(error);
    
        if (error) {
          callback(null, error);
        } else {
          
          console.log("HELLO WORLD")
          slicedata=result[0]
          console.log("Community with max posts",slicedata)
          callback(null, slicedata);
        }
      });
  }

exports.handle_request = handle_request;