const mongoose = require("mongoose");
const Community = require("../model/Community");
const Post = require("../model/Post");

  
 
  async function handle_request(msg, callback) {
        user_email=msg.user_email
        
    

   
    const all_posts= await Post.aggregate(
      [
        
        {
          $group :{
            
              _id : "$communityName",
              count: { $sum: 1 }
           
         }
        }
       ]
         
      , (error, all_posts) => {
        if (error) {
          callback(null, error);
        }
        if (all_posts) {
            console.log("Got count")
          console.log(all_posts);
          callback(null, all_posts);
        }
      }
    );
  }
  
  exports.handle_request = handle_request;
