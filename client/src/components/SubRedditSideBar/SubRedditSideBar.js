import React from "react";
import "./SubRedditSideBar.css";

function SubRedditSideBar() {
  return (
    <div>
      <div className="sidebar-view-subreddit">
        <div style={{ color: "black", fontWeight: "bold" }}>
          <img
            style={{ height: "100px", width: "310px" }}
            src="https://media.wired.com/photos/5abece0a9ccf76090d775185/125:94/w_1374,h_1033,c_limit/hangoutsscreen_2.jpg"
          />
        </div>
        <hr />
        <span>
          <span className="subreddit-text">
            <p>
              name of community <button className="rounded-pill">Join</button>
            </p>
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
