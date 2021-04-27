import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import "./PostTile.css";
import VoteButton from "../VoteButton/VoteButton";

function PostTile() {
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
                Subreddit name
              </a>
            </span>
            <span>
              . Posted by
              <a className="username" href="">
                Username
              </a>
            </span>
            <span> . Post Duration</span>
          </span>
          <hr />
          <div className="post-title">
            <a className="postname" href="">
              Post name add post url here in href
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
