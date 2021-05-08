const router = require("express").Router();
const checkAuth = require("../utils/passport");
var kafka = require("../kafka/client");
const passport = require("passport");

router.get(
    "/ListOfUserJoinedCommunityCreatedByUser",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      console.log("Inside ListOfUserJoinedCommunityCreatedByUser");
      console.log(req.body);
      kafka.make_request("list_of_user_joined_community_by_user", req.body, function (err, results) {//add topic/changeeeee
        console.log("Inside ListOfUserJoinedCommunityCreatedByUser");
        if (err) {
          console.log("Inside err");
          res.json({
            status: "error",
            msg: "Error",
          });
          res.status(400).end();
        } else {
          console.log("Inside else", results);
          
            res.status(200).send({results:results});
          
        }
      });
    }
  );
  
  module.exports = router;