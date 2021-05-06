import React from "react";
import UsersBar from "../UsersBar/UsersBar";

function CommunityModeration() {
  return (
    <div>
      <div className="reddit-body">
        <div className="container">
          <div className="row">
            <hr />           
            <div className="col-md-3">
              <UsersBar></UsersBar>             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityModeration;
