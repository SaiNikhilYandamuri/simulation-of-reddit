const mongoose = require("mongoose");
const Messages = require("../model/Messages");

async function handle_request(msg, callback) {
    // Need to implement images later
    const senderName = msg.senderName;
    const recieverName = msg.recieverName;
    

    console.log("Inside get message");
    console.log(senderName);
    console.log(recieverName);

    Messages.find( { senderName: { $ne: 1.99, $exists: true } } )

  
    // Community.findOne(
    //   { communityName: communityName },
    //   (error, communityDetails) => {
    //     if (error) {
    //       callback(null, error);
    //     }
    //     if (communityDetails) {
    //       callback(null, "Community with the name already exists");
    //     } else {
    //       community.save(async (error, data) => {
    //         if (error) {
    //           callback(null, error);
    //         } else {
    //           callback(null, "Succesfully created.");
    //         }
    //       });
    //     }
    //   }
    // );
  }
  
  exports.handle_request = handle_request;