const router = require("express").Router();
const checkAuth = require("../utils/passport");
var kafka = require("../kafka/client");
const passport = require("passport");

const redis = require("redis");

const REDDIS_PORT = process.env.PORT;

const client = redis.createClient(6379, "52.15.224.162");

//cache middleware
function cache(req, res, next) {
  console.log("inside cache");
  const { senderEmail, recieverEmail } = req.body;

  client.get(senderEmail + "&" + recieverEmail, (err, data) => {
    if (err) {
      throw err;
    }

    if (data !== null) {
      res.send(data);
    } else {
      next();
    }
  });
}

router.post(
  "/getMessages",
  passport.authenticate("jwt", { session: false }),
  cache,
  async (req, res) => {
    console.log("Inside get messages");
    console.log(req.body);
    kafka.make_request("get_messages", req.body, function (err, results) {
      //add topic/changeeeee
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
        client.setex(
          req.body.senderEmail + "&" + req.body.recieverEmail,
          3600,
          JSON.stringify(results)
        );
        res.status(200).send({ results: results });
      }
    });
  }
);

module.exports = router;
