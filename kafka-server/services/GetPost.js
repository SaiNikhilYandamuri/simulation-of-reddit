const mongoose = require("mongoose");
const Post = require("../model/Post");

async function handle_request(msg, callback) {
  // Need to implement images later
  console.log(msg);
  console.log(msg.userEmail);

  if(msg.userEmail == undefined){
      console.log("hello user undefined");
      Post.find(
        {communityName:msg.communityName}).sort({"created_time":-1}).then((error, result) => {
          if (error) {
            callback(null, error);
          } else {
            console.log("Inside Else of result");
            console.log(result);
            callback(null, result);
          }
        });
  }else if(msg.communityName == undefined){
      console.log("hello community name undefined");
      Post.find(
        {createdByEmail:msg.userEmail}).sort({"created_time":-1}).then((error, result) => {
          if (error) {
            callback(null, error);
          } else {
            console.log("Inside Else of result");
            console.log(result);
            callback(null, result);
          }
        });
  }
  

 

}

exports.handle_request = handle_request;