const router = require("express").Router();
const checkAuth = require("../utils/passport");
var kafka = require("../kafka/client");
const passport = require("passport");

router.post(
    "/CommunitiesListByUser",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      console.log("Inside CommunitiesListByUser");
      console.log(req.body);
      kafka.make_request("communities_list_by_user", req.body, function (err, results) {//add topic/changeeeee
        console.log("Inside CommunitiesListByUser");
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