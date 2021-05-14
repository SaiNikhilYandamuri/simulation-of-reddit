const mongoose = require("mongoose");
const Community = require("../model/Community");
const Post = require("../model/Post");

  
 
  async function handle_request(msg, callback) {
    user_email=msg.user_email
   
    await Post.find({createdByEmail:user_email},{postTitle:1,numberOfUpvotes:1}).sort({numberOfUpvotes:-1})
    .then((result, error) => {
        console.log("YOLO")
        console.log(error);
    
        if (error) {
          callback(null, error);
        } else {
          
          console.log("HELLO WORLD")
          slicedata=result[0]
          console.log("Most upvoted Post",slicedata)
          callback(null, slicedata);
        }
      });
  }
  
  exports.handle_request = handle_request;
