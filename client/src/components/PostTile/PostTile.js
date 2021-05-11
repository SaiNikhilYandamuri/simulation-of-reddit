import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import "./PostTile.css";
import VoteButton from "../VoteButton/VoteButton";

function PostTile(props) {
  return (
    <div>
      <div className="row post">
        <div className="col-md-1">
          <VoteButton />
        </div>
        <div className="col-md-11">
          <span className="subreddit-info">
            <span className="subreddit-text">
              <a className="posturl" href="">
                {props.postTitle}
              </a>
            </span>
            <span>
              . Posted by {props.createdByEmail}
              <a className="username" href="">
                Username
              </a>
            </span>
            <span> . Post Duration</span>
          </span>
          <hr />
          <div className="post-title">
            <a className="postname" href="">
              {props.text}
            </a>
          </div>
          <div>
            <p className="post-text">Post Description</p>
          </div>
          <hr />
          <span>
            <a className="btnCommments" role="button">
              <FontAwesomeIcon icon={faComment} />
              Comments
            </a>
            <button className="login">Read Post</button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default PostTile;
