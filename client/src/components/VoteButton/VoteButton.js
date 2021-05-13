import React from "react";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import endPointObj from "../../endPointUrl";
import Axios from "axios";
import "./VoteButton.css";
import { useDispatch, useSelector } from "react-redux";

function VoteButton({ id, votes, upVoteClick, type, searchString, sortdesk }) {
  const email = useSelector((state) => state.login.username);

  function vote(id, voteString, type = "post") {
    return new Promise((resolve, reject) => {
      if (type === "community") {
        Axios.post(
          endPointObj.url + "api/votingForCommunity",
          {
            email: email,
            communityName: id,
            voteString: voteString,
          },
          {
            headers: {
              Authorization: "jwt " + sessionStorage.getItem("token"),
            },
          }
        )
          .then((response) => {
            upVoteClick();
            console.log("successfully fetched comm");
            // setTitle(response.data.communityName);
          })
          .catch((err) => {
            console.error("an error occured");
            if (err.response && err.response.data) {
            }
          });
      } else {
        Axios.post(
          endPointObj.url + "api/votingForPost",
          {
            email: email,
            id: id,
            voteString: voteString,
          },
          {
            headers: {
              Authorization: "jwt " + sessionStorage.getItem("token"),
            },
          }
        )
          .then((response) => {
            upVoteClick(id);
            console.log("successfully fetched comm");
            // setTitle(response.data.communityName);
          })
          .catch((err) => {
            console.error("an error occured");
            if (err.response && err.response.data) {
            }
          });
      }
    });
  }

  return (
    <div>
      <div className="d-flex flex-column votebox">
        <div className="p-2">
          {console.log("id is", id)}
          <FontAwesomeIcon
            className="upvote"
            icon={faArrowUp}
            onClick={() => {
              console.log(type);
              vote(id, "upvote", type);
            }}
          />
        </div>
        {console.log("vote is", votes)}
        <div className="p-2 votecount">{votes}</div>
        <div className="p-2">
          <FontAwesomeIcon
            className="downvote"
            icon={faArrowDown}
            onClick={() => {
              vote(id, "downVote", type);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default VoteButton;
