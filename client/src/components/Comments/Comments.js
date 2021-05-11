import React from "react";
import "./Comments.css";
import VoteButton from "../VoteButton/VoteButton";

function Comments() {
  return (
    <div>
      <div className="row">
        <div className="col-md-1">
          <VoteButton />
        </div>
        <div className="col-md-11">
          <div style={{ marginTop: "10px" }}>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comments;
