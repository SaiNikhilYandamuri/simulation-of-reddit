import React, { PureComponent, useEffect } from "react";
import NavigationBar from "../NavBar/NavBar";
import {
  PieChart,
  Pie,
  Legend,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { useSelector } from "react-redux";
import endPointObj from "../../endPointUrl";

function AnalyticsPage() {
  const [dataMembers, setDataMembers] = React.useState([]);
  const [dataPostMembers, setdataPostMembers] = React.useState([]);
  const [mostUpvotedPost, setdatamostUpvotedPost] = React.useState("");
  const [mostUpvotedPostCommunityName, setdatamostUpvotedPostCommunityName] = React.useState("");
  const [maxNoOfPost, setdatamaxNoOfPost] = React.useState("");
  const [communityWithMaxPost, setdatacommunityWithMaxPost] = React.useState("");
  const name = useSelector((state) => state.login.username);

  const getNoOfMembers = () => {
    console.log("in get no of members");
    Axios.post(
      endPointObj.url + "api/noofmembers",
      { user_email: name },
      {
        headers: {
          Authorization: "jwt" + sessionStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        console.log(response.data);
        setDataMembers(response.data);
        console.log(dataMembers);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getNoOfPosts = () => {
    console.log("in get no of post");
    Axios.post(
      endPointObj.url + "api/noofposts",
      { user_email: name },
      {
        headers: {
          Authorization: "jwt" + sessionStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        console.log(response.data);
        setdataPostMembers(response.data);
        console.log(dataPostMembers);
      })
      .catch((e) => {
        console.log(e);
      });
  };




  const getMostUpvotedPost = () => {
    console.log("in getMostUpvotedPost");
    Axios.post(
      endPointObj.url + "api/mostupvotedpost",
      { user_email: name },
      {
        headers: {
          Authorization: "jwt" + sessionStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        console.log(response.data);
        console.log(response.data.postTitle);
        setdatamostUpvotedPost(response.data.postTitle);
        console.log(mostUpvotedPost);
        setdatamostUpvotedPostCommunityName(response.data.communityName);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getMaxNoOfPost = () => {
    console.log("in get no of post");
    Axios.post(
      endPointObj.url + "api/maxpostuser",
      { user_email: name },
      {
        headers: {
          Authorization: "jwt" + sessionStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        console.log(response.data);
        console.log(response.data._id);
        console.log(response.data._id.member);
        setdatamaxNoOfPost(response.data._id.member);
        console.log(dataPostMembers);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getCommunityWithMaxPost = () => {
    console.log("in get no of post");
    Axios.post(
      endPointObj.url + "api/maxpostcommunity",
      { user_email: name },
      {
        headers: {
          Authorization: "jwt" + sessionStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        console.log(response.data);
        setdatacommunityWithMaxPost(response.data.communityName);
        // console.log(dataPostMembers);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getNoOfMembers();
    getNoOfPosts();
    getMostUpvotedPost();
    getMaxNoOfPost();
    getCommunityWithMaxPost();
  }, []);

  return (
    <div>
      <div></div>
      <NavigationBar></NavigationBar>
      <div>
        <div>
          <b>
            <strong>
              <h1>
                <center>ANALYTICS PAGE</center>
              </h1>
            </strong>
          </b>
        </div>
        <div>
          <div class="container">
            <div class="row">
              <div class="col"></div>
              <div class="col-6">
                <center>
                  <BarChart
                    width={500}
                    height={300}
                    data={dataMembers}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="2 2" />
                    <XAxis dataKey="communityName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="numberOfMembers" fill="#8884d8" />
                    {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
                  </BarChart>

                  <BarChart
                    width={500}
                    height={300}
                    data={dataPostMembers}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="2 2" />
                    <XAxis dataKey="communityName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="numberOfPosts" fill="#8884d8" />
                    {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
                  </BarChart>
                </center>
              </div>
              <div class="col">
                <strong><h3>OTHER STATISTICS</h3></strong><br></br><h5>
                <strong>-</strong>Most Upvoted Post is <strong>{mostUpvotedPost}</strong> from community <strong>{mostUpvotedPostCommunityName}</strong>
                <br></br>
                <strong>-</strong>Maximum Number of Post Created by: <strong>{maxNoOfPost}</strong>
                <br></br>
                <strong>-</strong>Community with maximum posts: <strong>{communityWithMaxPost}</strong></h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
