const mongoose = require("mongoose");
const Community = require("../model/Community");
const Post = require("../model/Post");

  
 
  async function handle_request(msg, callback) {
        user_email=msg.user_email
        await Community.find({createdBy:user_email},{communityName:1,numberOfPosts:1})
    .then((result, error) => {
        console.log("YOLO")
        console.log(error);
    
        if (error) {
          callback(null, error);
        } else {
          
          console.log("HELLO WORLD")
         
          console.log("Community with max posts",result)
          callback(null, result);
        }
      });
  }
        
    

   
    
  
  exports.handle_request = handle_request;
