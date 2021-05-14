const mongoose = require("mongoose");
const Community = require("../model/Community");
const paginate = require("../../server/utils/pagination");

async function handle_request(msg, callback) {
  // Need to implement images later
  console.log("inside comm list");
  console.log(msg);
  const senderEmail = msg.senderEmail;
//   const recieverEmail = msg.recieverEmail;

//   console.log("Inside get message");
  console.log(senderEmail);
//   console.log(recieverEmail);

Community.find(
    {createdBy: senderEmail}).sort({"creationTime":-1}).then((result,error) => {
      if (error) {
        callback(null, error);
      } else {
        console.log("Inside Else of result");
        console.log(result);

        var result = paginate(result, msg.pageNum, msg.pageSize);
        callback(null, result);
      }
    });

}

exports.handle_request = handle_request;
