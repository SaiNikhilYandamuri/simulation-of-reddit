import React from "react";
import VoteButton from "../VoteButton/VoteButton";
import "./ViewPost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import SideBar from "../SideBar/SideBar";
import SubRedditSideBar from "../SubRedditSideBar/SubRedditSideBar";
import AboutCommunity from "../AboutCommunity/AboutCommunity";
import CommunityRules from "../CommunityRules/CommunityRules";
import Comments from "../Comments/Comments";

function ViewPost() {
  return (
    <div>
      <div class="container">
        <div class="row">
          <hr />
          <div class="col-md-9">
            <div class="row post">
              <div class="col-md-1">
                <VoteButton></VoteButton>
              </div>
              <div class="col-md-11">
                <span>
                  <span class="subreddit-text">
                    <a class="post-url" href="">
                      CommunityName
                    </a>
                  </span>
                  <span>
                    . Posted
                    <span> Duration </span>
                    by
                    <a class="username" href="">
                      Anonymous
                    </a>
                    <a class="username" href="">
                      Write if condirtion if username is present
                    </a>
                  </span>
                </span>
                <hr />
                <a class="post-title">Post Title</a>
                <div>
                  <p class="post-text">ABC ABC</p>
                  {/* Inner HTML Fix Karna Hai */}
                </div>
                <div class="post-comment">
                  <form>
                    <div class="form-group">
                      <textarea
                        class="form-control"
                        placeholder="Your Thoughts?"
                      ></textarea>
                    </div>
                    <button type="submit" class="login float-right">
                      Comment
                    </button>
                  </form>
                </div>
                <br></br>
                <Comments></Comments>
                {/* <div style={{ marginTop: "60px" }}>
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
                </div> */}
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <AboutCommunity></AboutCommunity>
            <CommunityRules></CommunityRules>
            <SubRedditSideBar></SubRedditSideBar>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPost;
