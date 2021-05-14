const mongoose = require("mongoose");
const Community = require("../model/Community");


async function handle_request(msg, callback) {
    // let url_array=msg.url_array
    console.log("Got multiple images at kafka",msg.url_array)
    console.log("Got email at kafka",msg.community_name)
    let community_name=msg.community_name
    let url_array=msg.url_array
    
  const upload_img= await Community.updateOne({communityName:community_name},{ $addToSet: {images:url_array}}
  , (error, result) => {
    if (error) {
        console.log("In error",err)
        callback(null, error);
      } else {
        console.log("I am here")
        callback(null, result);
      }
    }
  );
}

exports.handle_request = handle_request;