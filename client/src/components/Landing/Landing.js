import React from "react";
import { Image } from "react-bootstrap/esm";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./Landing.css";
import image1 from "../resources/redditGp.PNG";
import landing from "../resources/landing.PNG";

export default function Landing() {
  return (
    <React.Fragment>
      <CssBaseline />
      <div className="landing-bg">
        {" "}
        <center>
          <Image className="myImage" src={image1} />
        </center>
      </div>
    </React.Fragment>
  );
}
