import React from "react";
import "./Comments.css";
import VoteButton from "../VoteButton/VoteButton";

function Comments({
  commentedBy,
  commentTime,
  commentBody,
  id,
  votes,
  upVoteClick,
}) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return (
    <div>
      <div className="row">
        <div className="col-md-1">
          <VoteButton id={id} votes={votes} upVoteClick={upVoteClick} />
        </div>
        <div className="col-md-11">
          <div style={{ marginTop: "10px" }}>
            <div class="comment">
              <div class="username">
                <p>
                  <i>Commenter:</i> &ensp;
                  <b>{commentedBy}</b>
                  <br></br>
                  <i>Commented At:</i> &ensp;
                  <b>
                    {new Date(commentTime).toLocaleDateString(
                      undefined,
                      options
                    )}
                  </b>
                  <br></br>
                  <i>Comment Body:</i> &ensp;
                  <b>{commentBody}</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comments;
