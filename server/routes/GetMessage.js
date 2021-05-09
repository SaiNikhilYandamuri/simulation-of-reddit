const router = require("express").Router();
const checkAuth = require("../utils/passport");
var kafka = require("../kafka/client");
const passport = require("passport");
const Message = require("../model/Messages");

const redis = require("redis");

const REDDIS_PORT = process.env.PORT;

const client = redis.createClient(6379, "localhost");

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

router.post("/getMessages", async (req, res) => {
  const senderEmail = req.body.senderEmail;
  const recieverEmail = req.body.recieverEmail;

  console.log("Inside get message");
  console.log(senderEmail);
  console.log(recieverEmail);

  Message.find({
    $or: [
      { senderEmail: senderEmail, recieverEmail: recieverEmail },
      { senderEmail: recieverEmail, recieverEmail: senderEmail },
    ],
  })
    .sort({ created_time: -1 })

    .lean()
    .select({ senderEmail: 1, message: 1 })
    .then((result) => {
      console.log(result, "result");
      if (result) {
        console.log("inside error");
        client.setex(
          req.body.senderEmail + "&" + req.body.recieverEmail,
          3600,
          JSON.stringify(result)
        );
        res.status(200).send({ result: result });
      } else {
        console.log("Inside Else of result");

        console.log(result);
        res.status(400).send({ error: "an error occured" });
      }
    });

  // console.log("Inside get messages");
  // console.log(req.body);
  // kafka.make_request("get_messages", req.body, function (err, results) {
  //   //add topic/changeeeee
  //   console.log("Inside get message topic");
  //   if (err) {
  //     console.log("Inside err");
  //     res.json({
  //       status: "error",
  //       msg: "Error",
  //     });
  //     res.status(400).end();
  //   } else {
  //     console.log("Inside else", results);
  //     // client.setex(
  //     //   req.body.senderEmail + "&" + req.body.recieverEmail,
  //     //   3600,
  //     //   JSON.stringify(results)
  //     // );
  //     res.status(200).send({ results: results });
  //   }
  // });
});

module.exports = router;
