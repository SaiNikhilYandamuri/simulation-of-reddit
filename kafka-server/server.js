const connection = new require("./kafka/Connection");
const mongoose = require("./services/mongoose");
const createCommunity = require("./services/CreateCommunity");
const searchCommunity = require("./services/SearchCommunity");
const addMessages = require("./services/AddMessages");
const getMessages = require("./services/GetMessages");
const addPost = require("./services/AddPost");
const getPost = require("./services/GetPost");
const requestToJoinCommunity = require("./services/RequestToJoinCommunity");
const inviteToJoinCommunity = require("./services/InviteToJoinCommunity");
const acceptInvitationByUser = require("./services/AcceptInvitationByUser.js");
const getCommunity = require("./services/GetCommunity");
const getProfile = require("./services/GetProfile");
const updateProfile = require("./services/UpdateProfile");
const imageUpload = require("./services/UploadImage");
const approverequesttojoincommunity = require("./services/ApproveRequestToJoinCommunity");
const checkapprovedstatus = require("./services/CheckApprovedStatus");
const votingforpost = require("./services/VotingForPost");
const votingforcommunity = require("./services/VotingForCommunity");

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function (err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, function (err, data) {
        console.log(data);
      });
      return;
    });
  });
}

handleTopicRequest("requesttojoin_communitys", requestToJoinCommunity);
handleTopicRequest("create_communitys1", createCommunity);
handleTopicRequest("search_community1", searchCommunity);
handleTopicRequest("add_messages", addMessages);
handleTopicRequest("get_messages", getMessages);
handleTopicRequest("addPost", addPost);
handleTopicRequest("getPost", getPost);
handleTopicRequest("invitetojoin_community", inviteToJoinCommunity);
handleTopicRequest("acceptinvitationbyuser", acceptInvitationByUser);
handleTopicRequest("getcommunity", getCommunity);
handleTopicRequest("get_profiles", getProfile);
handleTopicRequest("update_profiles", updateProfile);
handleTopicRequest("upload_images", imageUpload);
handleTopicRequest(
  "approverequesttojoincommunity",
  approverequesttojoincommunity
);
handleTopicRequest("checkapprovedstatus", checkapprovedstatus);
handleTopicRequest("votingforpost", votingforpost);
handleTopicRequest("votingforcommunity", votingforcommunity);
