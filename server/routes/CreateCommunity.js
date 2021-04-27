const router = require("express").Router();
const checkAuth = require("../utils/passport");
var kafka = require("../kafka/client");
const passport = require("passport");

/* router.post("/createCommunity", checkAuth, async function (req, res) {
  kafka.make_request("create_community", req.body, function (err, results) {
    console.log("Inside create_community topic");
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "Error",
      });
      res.status(400).end();
    } else {
      console.log("Inside else", results);
      if (results === "Succesfully created.") {
        res.status(200).send("Created successfully");
      } else {
        res.status(409).send("Community with the present name already exists");
      }
    }
  });
});*/

router.post(
  "/createCommunity",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log("Inside COmm");
    kafka.make_request("create_community", req.body, function (err, results) {
      console.log("Inside create_community topic");
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "Error",
        });
        res.status(400).end();
      } else {
        console.log("Inside else", results);
        if (results === "Succesfully created.") {
          res.status(200).send("Created successfully");
        } else {
          res
            .status(409)
            .send("Community with the present name already exists");
        }
      }
    });
  }
);

module.exports = router;
