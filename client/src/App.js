import logo from "./logo.svg";
import "./App.css";
import NavigationBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/HomePage/HomePage";
import CommunityPage from "./components/CommunityPage/CommunityPage";
import MyAccount from "./components/MyAccount/MyAccount";
import CreatePost from "./components/CreatePost/CreatePost";


const DefaultContainer = () => (
  <div>
    <div>
      <NavigationBar />

      <Route path="/" exact component={Landing} />
      <Route path="/home" exact component={Home} />
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/communityPage" exact component={CommunityPage} />
          <Route path="/myAccount" exact component={MyAccount} />
          <Route path="/createpost" exact component={CreatePost} />
          <Route component={DefaultContainer} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
