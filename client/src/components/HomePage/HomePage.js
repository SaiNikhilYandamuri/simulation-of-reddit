import React from "react";
import SideBar from "../SideBar/SideBar";
import PostTile from "../PostTile/PostTile";
import SubRedditSideBar from "../SubRedditSideBar/SubRedditSideBar";

function HomePage() {
  return (
    <div>
      <div className="reddit-body">
        <div className="container">
          <div className="row">
            <hr />
            <div className="col-md-9">
              <PostTile />
            </div>
            <div className="col-md-3">
              <SideBar></SideBar>
              <SubRedditSideBar></SubRedditSideBar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
