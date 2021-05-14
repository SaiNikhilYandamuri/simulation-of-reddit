const router = require("express").Router();
const checkAuth = require("../utils/passport");
var kafka = require("../kafka/client");
const passport = require("passport");

const redis = require("redis");

const REDDIS_PORT = process.env.PORT;

const client = redis.createClient(6379, "18.216.48.26");

router.post(
  "/updateProfile",
  //   passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    client.flushall((err, succedded) => {
      console.log(succedded);
    }); //not sure if the right approach ....:(
    console.log("Inside update profile");
    kafka.make_request("update_profiles", req.body, function (err, results) {
      console.log("Inside update_profile topic");
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
