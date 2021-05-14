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

import Axios from "axios";
import NavigationBar from "../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import endPointObj from "../../endPointUrl";

const queryString = require("query-string");

function ViewPost() {
  const location = useLocation();
  const [comment, setComment] = React.useState("");
  const [postData, setPostData] = React.useState([]);
  const [commentData, setFetchedComments] = React.useState([]);
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
        setFetchedComments(response.data);

        console.log("successfully fetched comments");
        // setTitle(response.data.communityName);
      })
      .catch((err) => {
        console.error("an error occured");
        if (err.response && err.response.data) {
        }
      });
  };

  const fetchPostByID = () => {
    Axios.post(
      endPointObj.url + "api/getPostById",
      {
        postId: queryString.parse(location.search).id,
      },
      {
        headers: {
          Authorization: "jwt " + sessionStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        console.log("successfully fetched individual post");
        setPostData(response.data);
      })
      .catch((err) => {
        console.error("an error occured");
        if (err.response && err.response.data) {
        }
      });
  };

  useEffect(() => {
    fetchComments();
    fetchPostByID();
  }, []);

  const upVoteClickCommHome = (name) => {
    console.log(name);

    fetchPostByID().then((result) => {
      console.log("fetched post after comments");
    });
  };

  function upVoteClick(name) {
    upVoteClickCommHome(name);
    console.log(name);
  }

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
        setComment("");
        // setTitle(response.data.communityName);
        fetchComments();
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
                <VoteButton
                  id={postData._id}
                  votes={
                    parseInt(postData.numberOfUpvotes) -
                    parseInt(postData.numberOfDownvotes)
                  }
                  upVoteClick={upVoteClick}
                  // postTitle={postData.postTitle}
                  // text={postData.text}
                  // url={postData.url}
                  // images={postData.images}
                  //upVoteClickCommHome={upVoteClickCommHome}
                  // postTitle={postData.postTitle}
                  // votes={
                  //   parseInt(postData.numberOfUpvotes) -
                  //   parseInt(postData.numberOfDownvotes)
                  // }
                  // id={postData._id}
                  // createdByEmail={postData.createdByEmail}
                  // commName={postData.communityName}
                ></VoteButton>
              </div>
              <div class="col-md-11">
                <span>
                  <span class="subreddit-text">
                    <a class="post-url" href="">
                      {postData.communityName}
                    </a>
                  </span>
                  <span>
                    &nbsp;. Posted by &nbsp;
                    <a class="username" href="">
                      <b>{postData.createdByEmail}</b>
                    </a>
                  </span>
                </span>
                <hr />
                <a class="post-title">{postData.postTitle}</a>
                {(function () {
                  if (postData.url != undefined) {
                    return (
                      <div>
                        <p class="posturl">{postData.url}</p>
                      </div>
                    );
                  } else if (postData.images != undefined) {
                    return (
                      <div>
                        <div className="img-holder">
                          <img src={postData.images} alt="" className="img" />
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div>
                        <p class="post-text">{postData.text}</p>
                        {/* Inner HTML Fix Karna Hai */}
                      </div>
                    );
                  }
                })()}
                <div class="post-comment">
                  <div class="form-group">
                    <textarea
                      value={comment}
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
                <br></br>
                <br></br>
                {commentData.map((comm) => (
                  <Comments
                    commentedBy={comm.commentedBy}
                    commentTime={comm.creationTime}
                    commentBody={comm.comment}
                    id={comm.parentId}
                    votes={
                      parseInt(postData.numberOfUpvotes) -
                      parseInt(postData.numberOfDownvotes)
                    }
                    upVoteClick={upVoteClick}
                  ></Comments>
                ))}

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
            <SideBar></SideBar>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPost;

// postTitle={postData.postTitle}
// text={postData.text}
// url={postData.url}
// images={postData.images}
// upVoteClickCommHome={upVoteClickCommHome}
// postTitle={postData.postTitle}
// votes={
//   parseInt(postData.numberOfUpvotes) -
//   parseInt(postData.numberOfDownvotes)
// }
// id={postData._id}
// createdByEmail={postData.createdByEmail}
// commName={postData.communityName}

// id,
//   votes,
//   postTitle,
//   createdByEmail,
//   creationtime,
//   // text,
//   // url,
//   // images,
//   upVoteClickCommHome,
//   commName,
