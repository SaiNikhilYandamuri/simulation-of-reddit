import React from "react";
import "./CommunityRules.css";

function CommunityRules() {
  return (
    <div>
      <div className="sidebar-view-subreddit">
        <p className="community-rules">Community Rules</p>
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

export default CommunityRules;
