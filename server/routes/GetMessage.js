const router = require("express").Router();
const checkAuth = require("../utils/passport");
var kafka = require("../kafka/client");
const passport = require("passport");

router.get(
    "/getMessages",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      console.log("Inside get messages");
      kafka.make_request("", req.body, function (err, results) {//add topic/changeeeee
        console.log("Inside get message topic");
        if (err) {
          console.log("Inside err");
          res.json({
            status: "error",
            msg: "Error",
          });
          res.status(400).end();
        } else {
          console.log("Inside else", results);
          if (results === "Succesfully added.") {
            res.status(200).send("added successfully");
          }
        }
      });
    }
  );
  
  module.exports = router;