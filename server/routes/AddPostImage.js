const router = require("express").Router();
const checkAuth = require("../utils/passport");
var kafka = require("../kafka/client");
const passport = require("passport");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
var util = require("util");
const { uploadFile, getFileStream } = require("../../server/utils/imageconfig");
const unlinkFile = util.promisify(fs.unlink);

router.post(
  "/addPostImage/",
  upload.single("file"),
  //   passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log("Inside image upload");
    console.log("Got image body", req.body);
    console.log("Got file details:", req.file);
    const file = req.file;
    const result = await uploadFile(file);

    await unlinkFile(file.path);
    console.log("Hello");

    console.log(result.Location);

    var data = {
      email: req.params.email,
      url: result.Location,
    };

    kafka.make_request("upload_images", data, function (err, results) {
      console.log("Inside upload_image topic");
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "Error",
        });
        res.status(400).end();
      } else {
        res.status(200).send({ message: "IMage uploaded successfully!" });
      }
    });
  }
);

module.exports = router;
