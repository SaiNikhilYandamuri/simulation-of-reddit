const mongoose = require("mongoose");
const Community = require("../model/Community");

async function handle_request(msg, callback) {
  user_email=msg.user_email
  // Need to implement images later
  

  // const allusers= await Community.aggregate
  // ([
  //     {$group:{_id:"$communityName","count": { "$sum": { "$size": "$members" } } } }
    
    
  //   ],
  //   (error, allusers) => {
  //     if (error) {
  //       callback(null, error);
  //     }
  //     if (allusers) {
  //         console.log("Got count")
  //       console.log(allusers);
  //       callback(null, allusers);
  //     }
  //   }
  // );

  const allusers= await Community.find({createdBy:user_email},{communityName:1,numberOfMembers:1}
  , (error, allusers) => {
      if (error) {
        callback(null, error);
      }
      if (allusers) {
          console.log("Got count")
        console.log(allusers);
        callback(null, allusers);
      }
    }
  );
}

exports.handle_request = handle_request;