const router = require("express").Router();
const checkAuth = require("../utils/passport");
var kafka = require("../kafka/client");
const passport = require("passport");

router.post(
  "/getProfile",
//   passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log("Inside get profile");
    kafka.make_request("get_profile", req.body, function (err, results) {
      console.log("Inside get_profile topic");
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "Error",
        });
        res.status(400).end();
      } else {
        res.status(200).send(results);
      }
    });
  }
);

module.exports = router;
