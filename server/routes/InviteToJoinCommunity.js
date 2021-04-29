const router = require("express").Router();
const checkAuth = require("../utils/passport");
var kafka = require("../kafka/client");
const passport = require("passport");

router.post(
  "/inviteToJoinCommunity",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log("Inside COmm");
    kafka.make_request(
      "invitetojoin_community",
      req.body,
      function (err, results) {
        console.log("Inside invitetojoin_community topic");
        if (err) {
          console.log("Inside err");
          res.json({
            status: "error",
            msg: "Error",
          });
          res.status(400).end();
        } else {
          console.log("Inside else", results);
          res.status(200).send("Invite to Join Community was successful.");
        }
      }
    );
  }
);

module.exports = router;
