const mongoose = require("mongoose");
const Community = require("../model/Community");
const Post = require("../model/Post");

  
 
  async function handle_request(msg, callback) {

   
    const user_max_post= await Post.aggregate(
      [
        
        {
          $group :{
            
              _id : "$createdByEmail",
              count: { $sum: 1 },
               
          }
        },
         {
            $sort:{'count':-1}
         }
        
       ]
         
      , (error, user_max_post) => {
        if (error) {
          callback(null, error);
        }
        if (user_max_post) {
          max_user=user_max_post.shift()

          console.log("Got user max post")
          console.log(max_user);
          callback(null, max_user);
        }
      }
    );
  }
  
  exports.handle_request = handle_request;
