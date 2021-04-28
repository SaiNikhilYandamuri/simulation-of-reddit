import React from "react";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./VoteButton.css";

function VoteButton() {
  return (
    <div>
      <div className="d-flex flex-column votebox">
        <div className="p-2">
          <FontAwesomeIcon className="upvote" icon={faArrowUp} />
        </div>
        <div className="p-2 votecount">2</div>
        <div className="p-2">
          <FontAwesomeIcon className="downvote" icon={faArrowDown} />
        </div>
      </div>
    </div>
  );
}

export default VoteButton;
