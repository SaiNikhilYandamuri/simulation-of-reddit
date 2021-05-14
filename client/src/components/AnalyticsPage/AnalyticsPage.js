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
import endPointObj from "../../endPointUrl";

function AnalyticsPage() {
  const [dataMembers, setDataMembers] = React.useState([]);
  const [dataPostMembers, setdataPostMembers] = React.useState([]);

  const getNoOfMembers = () => {
    console.log("in get no of members");
    Axios.get(endPointObj.url + "api/noofmembers", {
      headers: {
        Authorization: "jwt" + sessionStorage.getItem("token"),
      },
    })
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
    Axios.get(endPointObj.url + "api/noofposts", {
      headers: {
        Authorization: "jwt" + sessionStorage.getItem("token"),
      },
    })
      .then((response) => {
        console.log(response.data);
        setdataPostMembers(response.data);
        console.log(dataPostMembers);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getNoOfMembers();
    getNoOfPosts();
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
              <div class="col">1 of 3</div>
              <div class="col-10">
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
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                    {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
                  </BarChart>
                </center>
              </div>
              <div class="col">
                <strong>OTHER STATS</strong>
                -Most Upvoted Post:
                <br></br>
                -Maximum Number of Post Created by:
                <br></br>
                -Community with maximum posts:
              </div>
            </div>
          </div>
        </div>
        
      </div>
      
    </div>
  );
}

export default AnalyticsPage;
