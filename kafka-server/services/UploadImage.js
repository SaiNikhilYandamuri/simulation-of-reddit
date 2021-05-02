const mongoose = require("mongoose");
const pool = require("../../server/utils/mysqlConnection");
// const upload = multer({ dest: "uploads/" });
const multer=require("multer")


async function handle_request(msg, callback) {
    console.log("Here")
  const email= msg.email
  const file_path=msg.url
  console.log("Getting email",email)
  console.log("Getting file details",file_path)
  const uploadImg = "UPDATE User SET profile_picture=? where email=?";
  pool.query(uploadImg, [file_path,email], (err, result) => {
  console.log("Got query res")
  if (err) {
    console.log("In error",err)
    callback(null, error);
  } else {
    callback(null, result);
  }
}
  )
}
 

exports.handle_request = handle_request;