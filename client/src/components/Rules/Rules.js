import React from "react";
import rulesLogo from "../resources/Rules.PNG";
import "./Rules.css";

function Rules() {
  return (
    <div>
      <div className="sidebar-view-subreddit">
        <img src={rulesLogo} />
        <div className="sidebar-view-subreddit">
          <hr />
          <span>
            <span className="subreddit-text">
              <a>Rules</a>
            </span>
            <hr />
          </span>
          {/* <div style={{ textAlign: "center" }}>
            <a style={{ fontWeight: "bold" }} href="/subreddits">
              View All
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Rules;
