import React from "react";
import "./SideBar.css";

function SideBar() {
  return (
    <div>
      <div className="sidebar">
        <img src="https://www.redditstatic.com/desktop2x/img/id-cards/home-banner@2x.png" />
        <div style={{ textAlign: "center", fontSize: "1em" }}>
          Welcome to Reddit Clone home page. Come here to check in with
          your favorite subreddits.
        </div>
        <div style={{ textAlign: "center" }}>
          <button className="btnCreatePost">Create Post</button>
        </div>
        <div style={{ textAlign: "center" }}>
          <button className="btnCreateSubreddit">Create Subreddit</button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
