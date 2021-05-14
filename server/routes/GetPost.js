const router = require("express").Router();
const checkAuth = require("../utils/passport");
var kafka = require("../kafka/client");
const passport = require("passport");

router.post(
  "/getPost",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log("Inside get post");
    kafka.make_request("get_post", req.body, function (err, results) {
      //add topic/changeeee
      console.log("Inside get post topic");
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
