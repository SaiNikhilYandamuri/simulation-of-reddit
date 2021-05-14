import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import "./PostTile.css";
import VoteButton from "../VoteButton/VoteButton";
import { useHistory } from "react-router-dom";

function PostTile({
  id,
  votes,
  postTitle,
  createdByEmail,
  creationtime,
  upvoteMembersTrue,
  downvoteMembersTrue,
  // text,
  // url,
  // images,
  upVoteClickCommHome,
  commName,
}) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const history = useHistory();

  const redirectToViewPost = () => {
    history.push({
      pathname: "/viewpost",
      search: "?id=" + id + "&name=" + commName,
    });
  };

  function upVoteClick(name) {
    upVoteClickCommHome(name);
    console.log(name);
  }

  // function downVoteClick(name) {
  //   downVoteClickCommHome(name);
  //   console.log(name);
  // }

  return (
    <div>
      <div className="row postcss">
        <div className="col-md-1">
          <VoteButton
            id={id}
            votes={votes}
            upVoteClick={upVoteClick}
            upvoteMembersTrue={upvoteMembersTrue}
            downvoteMembersTrue={downvoteMembersTrue}
          />
        </div>
        <div className="col-md-11">
          <span className="subreddit-info">
            {/* <span className="subreddit-text">
              <a className="posturl" href="">
                {postTitle}
              </a>
            </span> */}
            <span>
              Posted by
              <a className="username" href="">
                &nbsp;{createdByEmail}
              </a>
              .on{" "}
              {new Date(creationtime).toLocaleDateString(undefined, options)}
            </span>
          </span>
          <hr />
          <div className="post-title">
            <a className="postname" href="">
              {postTitle}
            </a>
          </div>
          <div>{/* <p className="post-text">Post Description</p> */}</div>
          <hr />
          <span>
            <a
              className="btnCommments"
              role="button"
              onClick={() => {
                redirectToViewPost();
              }}
            >
              <FontAwesomeIcon icon={faComment} />
              Comments
            </a>
            <button
              className="login"
              style={{ marginLeft: "5px", float: "right" }}
              onClick={() => {
                redirectToViewPost();
              }}
            >
              Read Post
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default PostTile;
