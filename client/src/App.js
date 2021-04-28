import logo from "./logo.svg";
import "./App.css";
import NavigationBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/HomePage/HomePage";

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
        <Route component={DefaultContainer} />
      </div>
    </Router>
  );
}

export default App;
