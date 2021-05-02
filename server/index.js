const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
const mongoose = require("./utils/mongoose");
const signup = require("./routes/Signup");
const login = require("./routes/Login");
const createCommunity = require("./routes/CreateCommunity");
const searchCommunity = require("./routes/SearchCommunity");
const requestedToJoinCommunity = require("./routes/RequestToJoinCommunity");
const inviteToJoinCommunity = require("./routes/InviteToJoinCommunity");
const acceptInvitationByUser = require("./routes/AcceptInvitationByUser.js");
const getCommunity = require("./routes/GetCommunity");

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
app.use("/api", createCommunity);
app.use("/api", searchCommunity);
app.use("/api", requestedToJoinCommunity);
app.use("/api", inviteToJoinCommunity);
app.use("/api", acceptInvitationByUser);
app.use("/api", getCommunity);
