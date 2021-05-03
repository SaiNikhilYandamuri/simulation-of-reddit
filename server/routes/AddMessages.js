const router = require("express").Router();
const checkAuth = require("../utils/passport");
var kafka = require("../kafka/client");
const passport = require("passport");

router.post(
    "/addMessages",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      console.log("Inside add messages");
      kafka.make_request("add_messages", req.body, function (err, results) {//add topic/changeeee
        console.log("Inside add message topic");
        if (err) {
          console.log("Inside err");
          res.json({
            status: "error",
            msg: "Error",
          });
          res.status(400).end();
        } else {
          console.log("Inside else", results);
          if (results.message === "Message added") {
            res.status(200).send("added successfully");
          }
        }
      });
    }
  );
  
  module.exports = router;