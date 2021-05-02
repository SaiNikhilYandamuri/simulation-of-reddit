const router = require("express").Router();
const pool = require("../utils/mysqlConnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../utils/config");
const { response } = require("express");
const { auth } = require("../Utils/passport");
auth();

router.post("/login", async (req, res) => {
  console.log("Inside Login");
  try {
    const email = req.body.email;
    const password = req.body.password;
    const loginQuery = "select name,password,email from User where email=?";
    pool.query(loginQuery, [email], (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log("Inside Login Else");
        console.log(result);
        if (result.length > 0) {
          console.log(result);
          bcrypt
            .compare(password, result[0].password)
            .then(async function (response) {
              if (response) {
                const payload = {
                  email: email,
                  name: result[0].name,
                };
                console.log("Inside Login If 2");

                const token = await jwt.sign(payload, secret, {
                  expiresIn: 600000,
                });

                res.status(200).json({ token: "jwt " + token });
              }
            })
            .catch((response) => {
              res.status(404).json({ message: "Invalid credentials!" });
            });
        }
      }
    });
  } catch (err) {
    return res.status(400).json({ message: "Enter Valid Credentials" });
  }
});

module.exports = router;
