const router = require("express").Router();
const checkAuth = require("../utils/passport");
var kafka = require("../kafka/client");
const passport = require("passport");

const redis = require("redis");

const REDDIS_PORT = process.env.PORT;

const client = redis.createClient(6379, "localhost");

//cache middleware
function cache(req, res, next) {
  const { email } = req.body;

  client.get(email, (err, data) => {
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
  "/getProfile",
  cache,
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log("Inside get profile");
    kafka.make_request("get_profiles", req.body, function (err, results) {
      console.log("Inside get_profile topic");
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "Error",
        });
        res.status(400).end();
      } else {
        console.log(typeof JSON.stringify(results), "result type");
        client.setex(req.body.email, 3600, JSON.stringify(results));
        res.status(200).send(results);
      }
    });
  }
);

module.exports = router;
