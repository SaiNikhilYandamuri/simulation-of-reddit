const connection = new require("./kafka/Connection");
const mongoose = require("./services/mongoose");
const createCommunity = require("./services/CreateCommunity");
const searchCommunity = require("./services/SearchCommunity");
const requestToJoinCommunity = require("./services/RequestToJoinCommunity");
const inviteToJoinCommunity = require("./services/InviteToJoinCommunity");
const acceptInvitationByUser = require("./services/AcceptInvitationByUser.js");
const getCommunity = require("./services/GetCommunity");

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

handleTopicRequest("create_communitys", createCommunity);
handleTopicRequest("search_community", searchCommunity);
handleTopicRequest("requesttojoin_community", requestToJoinCommunity);
handleTopicRequest("invitetojoin_community", inviteToJoinCommunity);
handleTopicRequest("acceptinvitationbyuser", acceptInvitationByUser);
handleTopicRequest("getcommunity", getCommunity);
