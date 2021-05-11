const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
const mongoose = require("./utils/mongoose");
const signup = require("./routes/Signup");
const login = require("./routes/Login");
const createCommunity = require("./routes/CreateCommunity");
const searchCommunity = require("./routes/SearchCommunity");
const acceptRequestToJoinCommunity = require("./routes/ApproveRequestToJoinCommunity");
const addMessages = require("./routes/AddMessages");
const getMessages = require("./routes/GetMessage");
const createPost = require("./routes/CreatePost");
const getPost = require("./routes/GetPost");
const requestedToJoinCommunity = require("./routes/RequestToJoinCommunity");
const inviteToJoinCommunity = require("./routes/InviteToJoinCommunity");
const acceptInvitationByUser = require("./routes/AcceptInvitationByUser.js");
const getCommunity = require("./routes/GetCommunity");
const getProfile = require("./routes/GetProfile");
const updateProfile = require("./routes/UpdateProfile");
const imageUpload = require("./routes/UploadImage");
const checkApprovedStatus = require("./routes/CheckApprovedStatus");
const votingForPost = require("./routes/VotingForPost");
const votingForCommunity = require("./routes/VotingForCommunity");
const userSearch = require("./routes/UserSearch");
const addComment = require("./routes/AddComment");
const getComments = require("./routes/GetComments");
const getPostById = require("./routes/GetPostById");
const getUserCommunities = require("./routes/GetUserCommunities");

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
app.use("/api", addMessages);
app.use("/api", getMessages);
app.use("/api", createPost);
app.use("/api", getPost);
app.use("/api", requestedToJoinCommunity);
app.use("/api", inviteToJoinCommunity);
app.use("/api", acceptInvitationByUser);
app.use("/api", getCommunity);
app.use("/api", getProfile);
app.use("/api", updateProfile);
app.use("/api", imageUpload);
app.use("/api", acceptRequestToJoinCommunity);
app.use("/api", checkApprovedStatus);
app.use("/api", votingForPost);
app.use("/api", votingForCommunity);
app.use("/api", userSearch);
app.use("/api", addComment);
app.use("/api", getComments);
app.use("/api", getPostById);
app.use("/api", getUserCommunities);
