import logo from "./logo.svg";
import "./App.css";
import NavigationBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/HomePage/HomePage";
import CommunityPage from "./components/CommunityPage/CommunityPage";
import MyAccount from "./components/MyAccount/MyAccount";

import CommunityModeration from "./components/CommunityModeration/CommunityModeration";
import SearchCommunity from "./components/SearchCommunity/SearchCommunity";
import CreatePost from "./components/CreatePost/CreatePost";
import Messages from "./components/Messages/Messages";
import ViewPost from "./components/ViewPost/ViewPost";
import StartChat from "./components/Chat/StartChat";
import Chat from "./components/Chat/Chat";
import AnalyticsPage from "./components/AnalyticsPage/AnalyticsPage"

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
          <Route path="/searchcommunity" exact component={SearchCommunity} />
          <Route path="/createpost" exact component={CreatePost} />
          <Route path="/messages" exact component={Messages} />
          <Route path="/viewpost" exact component={ViewPost} />


          <Route path="/startChat" exact component={StartChat} />
          <Route path="/chat" exact component={Chat} />
          <Route path="/analytics" exact component={AnalyticsPage} />

          <Route path="/communitymoderation" exact component={CommunityModeration} />
          <Route component={DefaultContainer} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
