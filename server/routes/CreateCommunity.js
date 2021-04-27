const router = require("express").Router();
const checkAuth = require("../utils/passport");
const kafka = require("../kafka/client");
router.post("/createCommunity", checkAuth, async function (req, res) {
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
      res.status(200).send("Created successfully");
    }
  });
});
