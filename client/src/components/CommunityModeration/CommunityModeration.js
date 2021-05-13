import React from "react";
import UsersBar from "../UsersBar/UsersBar";
import Middlebar from "../Middlebar/Middlebar"
import NavigationBar from "../NavBar/NavBar";
function CommunityModeration() {
  return (
    <div>
      <div className="reddit-body">
      <NavigationBar></NavigationBar>
        <div className="container">
          <div className="row">
          
          <div className="col-md-9">
             <Middlebar></Middlebar>
          </div>
            <hr />           
            {/* <div className="col-md-3">
              <UsersBar></UsersBar>             
            </div> */}
             
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityModeration;
