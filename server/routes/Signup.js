const router = require("express").Router();
const pool = require("../utils/mysqlConnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../utils/config");
const UserMetadata = require("../model/UserMetadata");

router.post("/signup", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const signupQuery =
      "INSERT INTO User (email, name, password) VALUES (?,?,?)";
    const getUserQuery = "Select email from User where email=?";
    pool.query(getUserQuery, [email], (err, result) => {
      if (err) {
        throw err;
      } else {
        if (result.length > 0) {
          res.status(409).json({ message: "User already exists!" });
        } else {
          bcrypt.hash(password, 10).then(async function (hash) {
            pool.query(
              signupQuery,
              [email, name, hash],
              async (err, result) => {
                const userMetadata = new UserMetadata({
                  email: email,
                });
                userMetadata.save(async (error, data) => {
                  const payload = {
                    email: email,
                    name: name,
                  };

                  const token = await jwt.sign(payload, secret, {
                    expiresIn: 600000,
                  });

                  res.status(200).json({ token: "jwt " + token });
                });
              }
            );
          });
        }
      }
    });
  } catch (err) {
    return res.status(400).json({ message: "Enter Valid Credentials" });
  }
});

module.exports = router;
