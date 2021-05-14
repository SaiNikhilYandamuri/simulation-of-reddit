import React from "react";
import "./SideBar.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function SideBar() {
  const history = useHistory();
  const email = useSelector((state) => state.login.username);

  const modalOpen = (type) => {
    history.push({
      pathname: "/home",
      search: "?modalOpen=true&type=" + type,
    });
  };

  const redirectToCreate = () => {
    history.push({
      pathname: "/createpost",
      // search: `?email=${email}`,
    });
  };

  return (
    <div>
      <div className="sidebar">
        <img src="https://www.redditstatic.com/desktop2x/img/id-cards/home-banner@2x.png" />
        <div style={{ textAlign: "center", fontSize: "1em" }}>
          Your personal Reddit frontpage. Come here to check in with your
          favorite communities.
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            className="btnCreatePost"
            onClick={() => {
              redirectToCreate();
            }}
          >
            Create Post
          </button>
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            className="btnCreateSubreddit"
            onClick={() => {
              modalOpen("createCommunity");
            }}
          >
            Create Community
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
