const router = require("express").Router();
const checkAuth = require("../utils/passport");
var kafka = require("../kafka/client");
const passport = require("passport");

router.post(
  "/addComment",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log("Inside create post");
    kafka.make_request("add_comment1", req.body, function (err, results) {
      //add topic/changeeee
      console.log("Inside create post topic");
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "Error",
        });
        res.status(400).end();
      } else {
        console.log("Inside else", results);

        res.status(200).send("Comment added successfully");
      }
    });
  }
);

module.exports = router;
