const mongoose = require("mongoose");
const Post = require("../model/Post");
const User = require("../model/");

async function handle_request(msg, callback) {
  // Need to implement images later
  console.log(msg);
  console.log(msg.userEmail);
  resultList=[]

  if(msg.userEmail == undefined){
      console.log("hello user undefined");
      User.find(
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
      console.log("hello community name undefined; changes in this api");
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