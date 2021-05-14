const router = require("express").Router();
const checkAuth = require("../utils/passport");
var kafka = require("../kafka/client");
const passport = require("passport");

const redis = require("redis");

const REDDIS_PORT = process.env.PORT;

const client = redis.createClient(6379, "18.216.48.26");

router.post(
  "/addMessages",

  async (req, res) => {
    console.log("Inside Add Messages");
    client.flushall((err, succedded) => {
      console.log(succedded);
    }); //not sure if the right approach ....:(
    console.log("Inside add messages");
    kafka.make_request("add_messages1", req.body, function (err, results) {
      //add topic/changeeee
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
