const router = require("express").Router();
const checkAuth = require("../utils/passport");
var kafka = require("../kafka/client");
const passport = require("passport");

router.get(
  "/noofmembers",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log("Inside members in community");
    kafka.make_request("noofmembers", req.body, function (err, results) {
      console.log("Inside all analytics topic");
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
