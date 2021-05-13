const router = require("express").Router();
const checkAuth = require("../utils/passport");
var kafka = require("../kafka/client");
const passport = require("passport");

router.post(
  "/votingForPost",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log("Inside voting post");
    kafka.make_request("votingforpost1", req.body, function (err, results) {
      //add topic/changeeee
      console.log("Inside votingForPost topic");
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "Error",
        });
        res.status(400).end();
      } else {
        console.log("Inside else", results);
        res.status(200).send(results);
      }
    });
  }
);

module.exports = router;