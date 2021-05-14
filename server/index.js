const express = require("express");
const axios = require("axios");
const socketio = require("socket.io");
const http = require("http");
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
const CommunitiesListByUser = require("./routes/CommunitiesListByUser");
const RequestedUsersList = require("./routes/RequestedUsersList");
const ListOfUserJoinedCommunityCreatedByUser = require("./routes/ListOfUserJoinedCommunityCreatedByUser");
const userSearch = require("./routes/UserSearch");
const addComment = require("./routes/AddComment");
const getComments = require("./routes/GetComments");
const getPostById = require("./routes/GetPostById");
const getUserCommunities = require("./routes/GetUserCommunities");
const deleteCommunity = require("./routes/DeleteCommunity");
const router = require("./router");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const { backendServer } = require("./utils/config");

const server = http.createServer(app);
const io = socketio(server);
const leaveCommunity = require("./routes/LeaveCommunity");
const votingForComments = require("./routes/VotingForComments");
const multiImages=require("./routes/MultipleImages")
const noOfMembers=require("./routes/NoOfMembers")
const noOfPosts=require("./routes/NoOfPosts")
const UserMaxPost=require("./routes/UserMaxPost")




app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(router);
// console.log(io);

console.log(io.socket);

io.on("connection", (socket) => {
  console.log("We have new connection");
  socket.on("start", ({ name, user }, callback) => {
    console.log(name, user);
    console.log(socket.id);
    // user = [name, (name = user)][0];
    const { existingUser, userNew } = addUser({ id: socket.id, name, user });
    // if (error) return callback(error);
    console.log(userNew);
    if (existingUser) {
      socket.join(name);
    } else {
      socket.join(userNew.user);
    }

    callback();
  });

  socket.on(
    "sendMessage",
    ({ message, senderEmail, recieverEmail }, callback) => {
      console.log(socket.id);
      const user = getUser(socket.id);
      console.log(user);
      console.log(message);
      if (user.user) {
        io.to(user.user).emit("message", { user: user.name, text: message });
      }
      console.log("Helllooooo");
      console.log(backendServer);
      axios
        .post(`${backendServer}/addMessages`, {
          message,
          senderEmail,
          recieverEmail,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });

      callback();
    }
  );
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    console.log("User has left!");
  });
});

server.listen(port, () => console.log(`Server has started on port ${port}`));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Reddit Server");
});

// app.listen(port, () => {
//   console.log(
//     `Express Server for Reddit Server started at http://localhost:${port}`
//   );
// });

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
app.use("/api", CommunitiesListByUser);
app.use("/api", RequestedUsersList);
app.use("/api", ListOfUserJoinedCommunityCreatedByUser);
app.use("/api", userSearch);
app.use("/api", addComment);
app.use("/api", getComments);
app.use("/api", getPostById);
app.use("/api", getUserCommunities);
app.use("/api", leaveCommunity);
app.use("/api", votingForComments);
app.use("/api", deleteCommunity);
app.use("/api", multiImages);
app.use("/api", noOfMembers);
app.use("/api", noOfPosts);
app.use("/api", UserMaxPost);