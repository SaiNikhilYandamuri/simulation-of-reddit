const router = require("express").Router();
const checkAuth = require("../utils/passport");
var kafka = require("../kafka/client");
const passport = require("passport");
const multer=require("multer")
const upload = multer({ dest: "uploads/" });
const fs = require('fs');
var util = require('util');
const {uploadFile,getFileStream} = require("../../server/utils/imageconfig")
const unlinkFile = util.promisify(fs.unlink);


router.post(
    "/multipleImages",upload.array("file"),
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      console.log("GOT REQUEST FILES")
      console.log("Inside multiple image upload");
      console.log("Got image body111",req.body)
      console.log("Got file details:",req.files)
      console.log("Length of request",req.files.length)
      console.log("Got community name to backend",req.body.community_name)
      let url_array=[]
      for(let i=0;i<req.files.length;i++)
      {
      const file=req.files[i]
      const result = await uploadFile(file);
 
    await unlinkFile(file.path);
    console.log("Hello")
   
    console.log(result.Location)
    url_array.push(result.Location)
      }
      console.log("URL ARRAY:",url_array)

    var data={
        community_name:req.body.community_name,
        url_array:url_array
    }

      kafka.make_request("community_imgs", data, function (err, results) {
        console.log("Inside upload_image topic");
        if (err) {
          console.log("Inside err");
          res.json({
            status: "error",
            msg: "Error",
          });
          res.status(400).end();
        } else {
          res.status(200).send({"message":"IMage uploaded successfully!"});
        }
      });
    }
  );

module.exports = router;