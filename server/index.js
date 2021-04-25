const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
const signup = require("./routes/Signup");
const login = require("./routes/Login");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Reddit Server");
});

app.listen(port, () => {
  console.log(
    `Express Server for Reddit Server started at http://localhost:${port}`
  );
});

app.use("/api", signup);
app.use("/api", login);
