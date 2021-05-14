import React, { PureComponent ,useEffect} from "react";
import NavigationBar from "../NavBar/NavBar";
import { PieChart, Pie, Legend, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import endPointObj from "../../endPointUrl";

function AnalyticsPage() {
  const [dataMembers, setDataMembers] = React.useState([]);
  const [dataPostMembers, setdataPostMembers] = React.useState([]);
  
  const getNoOfMembers = ()=>{
    console.log("in get no of members");
    Axios.get(endPointObj.url + "api/noofmembers",
    {
      headers:{
        Authorization: "jwt" + sessionStorage.getItem("token"),
      },
    })
    .then((response)=>{
      console.log(response.data);
      setDataMembers(response.data);
      console.log(dataMembers);

    })
    .catch((e)=>{
      console.log(e);
    })
  }

  const getNoOfPosts = ()=>{
    console.log("in get no of post");
    Axios.get(endPointObj.url + "api/noofposts",
    {
      headers:{
        Authorization: "jwt" + sessionStorage.getItem("token"),
      },
    })
    .then((response)=>{
      console.log(response.data);
      setdataPostMembers(response.data);
      console.log(dataPostMembers);

    })
    .catch((e)=>{
      console.log(e);
    })
  }


  useEffect(()=>{
getNoOfMembers();
getNoOfPosts();
  },[])

  return (
    <div>
      <div></div>
      <NavigationBar></NavigationBar><div>
      
        {/* <PieChart width={400} height={400}>
          <Pie
            dataKey="numberOfMembers"
            isAnimationActive={false}
            data={dataMembers}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Pie
            dataKey="numberOfMembers"
            data={dataMembers}
            cx={500}
            cy={200}
            innerRadius={40}
            outerRadius={80}
            fill="#82ca9d"
          />
          <Tooltip />
        </PieChart> */}
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
      </div>
      hello
    </div>
  );
}

export default AnalyticsPage;
