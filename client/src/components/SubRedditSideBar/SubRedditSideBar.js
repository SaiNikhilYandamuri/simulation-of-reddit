import React from "react";
import "./SubRedditSideBar.css";

function SubRedditSideBar() {
  return (
    <div>
      <div className="sidebar-view-subreddit">
        <div style={{ color: "black", fontWeight: "bold" }}>
          Browse Subreddits
        </div>
        <hr />
        <span>
          <span className="subreddit-text">
            <a href="">Subreddits</a>
          </span>
          <hr />
        </span>
        <div style={{ textAlign: "center" }}>
          <a style={{ fontWeight: "bold" }} href="/subreddits">
            View All
          </a>
        </div>
      </div>
    </div>
  );
}

export default SubRedditSideBar;
