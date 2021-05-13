import React, { useEffect } from "react";
import VoteButton from "../VoteButton/VoteButton";
import "./ViewPost.css";
import { useLocation, Switch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import SideBar from "../SideBar/SideBar";
import SubRedditSideBar from "../SubRedditSideBar/SubRedditSideBar";
import AboutCommunity from "../AboutCommunity/AboutCommunity";
import CommunityRules from "../CommunityRules/CommunityRules";
import Comments from "../Comments/Comments";

import { useLocation, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import endPointObj from "../../endPointUrl";
import NavigationBar from "../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import endPointObj from "../../endPointUrl";
import Axios from "axios";

const queryString = require("query-string");

function ViewPost() {
  const location = useLocation();
  const [comment, setComment] = React.useState("");
  const email = useSelector((state) => state.login.username);
  const commentHandle = (e) => {
    console.log(e.target.value);

    setComment(e.target.value);
  };

  const fetchComments = () => {
    Axios.post(
      endPointObj.url + "api/getComments",
      {
        parentId: queryString.parse(location.search).id,
      },
      {
        headers: {
          Authorization: "jwt " + sessionStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        console.log("successfully fetched comments");
        // setTitle(response.data.communityName);
      })
      .catch((err) => {
        console.error("an error occured");
        if (err.response && err.response.data) {
        }
      });
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const addComment = (comment) => {
    Axios.post(
      endPointObj.url + "api/addComment",
      {
        comment: comment,
        commentedBy: email,
        parentId: queryString.parse(location.search).id,
      },
      {
        headers: {
          Authorization: "jwt " + sessionStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        console.log("successfully fetched comm");
        // setTitle(response.data.communityName);
      })
      .catch((err) => {
        console.error("an error occured");
        if (err.response && err.response.data) {
        }
      });
  };

  return (
    <div>
      <NavigationBar></NavigationBar>
      <div class="container">
        <div class="row">
          <hr />
          <div class="col-md-9">
            <div class="row post">
              <div class="col-md-1">
                <VoteButton></VoteButton>
              </div>
              <div class="col-md-11">
                <span>
                  <span class="subreddit-text">
                    <a class="post-url" href="">
                      CommunityName
                    </a>
                  </span>
                  <span>
                    . Posted
                    <span> Duration </span>
                    by
                    <a class="username" href="">
                      Anonymous
                    </a>
                    <a class="username" href="">
                      Write if condirtion if username is present
                    </a>
                  </span>
                </span>
                <hr />
                <a class="post-title">Post Title</a>
                <div>
                  <p class="post-text">ABC ABC</p>
                  {/* Inner HTML Fix Karna Hai */}
                </div>
                <div class="post-comment">
                  <div class="form-group">
                    <textarea
                      class="form-control"
                      placeholder="Your Thoughts?"
                      onChange={(e) => commentHandle(e)}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    class="login float-right"
                    onClick={() => addComment(comment)}
                  >
                    Comment
                  </button>
                </div>
                <br></br>

                <Comments></Comments>
                {/* <div style={{ marginTop: "60px" }}>
                  <div class="comment">
                    <div class="username">
                      <a>Name of User</a>
                    </div>
                    <div>
                      <p>Comment Duration</p>
                    </div>
                    <b>Comment Text</b>
                  </div>
                  <hr />
                </div> */}
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <AboutCommunity></AboutCommunity>
            <CommunityRules></CommunityRules>
            <SubRedditSideBar></SubRedditSideBar>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPost;
