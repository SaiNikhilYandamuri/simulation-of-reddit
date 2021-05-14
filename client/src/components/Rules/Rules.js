import React from "react";
import rulesLogo from "../resources/Rules.PNG";
import "./Rules.css";

function Rules() {
  return (
    <div>
      <div className="sidebar-view-subreddit">
        <img src={rulesLogo} />
        <div className="sidebar-view-subreddit">
          <span>
            <span>
              <ol type="1">
                <li>Remember the human</li>
                <hr />
                <li>Behave like you would in real life</li>
                <hr />
                <li>Look for the original source of content</li>
                <hr />
                <li>Search for duplicates before posting</li>
                <hr />
                <li>Read the community’s rules</li>
                <hr />
              </ol>
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
