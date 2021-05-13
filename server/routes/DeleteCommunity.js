const router = require("express").Router();
const checkAuth = require("../utils/passport");
var kafka = require("../kafka/client");
const passport = require("passport");

router.post(
  "/deleteCommunity",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log("Inside COmm");
    kafka.make_request("deletecommunity", req.body, function (err, results) {
      console.log("Inside delete_community topic");
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "Error",
        });
        res.status(400).end();
      } else {
        console.log("Inside else", results);

        res.status(200).send("Deleted successfully");
      }
    });
  }
);

module.exports = router;
