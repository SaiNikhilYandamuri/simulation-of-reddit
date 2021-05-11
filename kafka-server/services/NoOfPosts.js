const mongoose = require("mongoose");
const Community = require("../model/Community");

async function handle_request(msg, callback) {
  
 
  const allposts= await Community.find({},{communityName:1,numberOfPosts:1}
  , (error, allposts) => {
      if (error) {
        callback(null, error);
      }
      if (allposts) {
          console.log("Got count")
        console.log(allposts);
        callback(null, allposts);
      }
    }
  );
}

exports.handle_request = handle_request;