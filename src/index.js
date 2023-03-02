import React, {useState} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import { Homepage } from "./components"

const App = () => {
  // const [token, setToken] = useState(localStorage.getItem("loginData"))
  // console.log(localStorage.getItem("loginData"))
  return (
    <div className="app">
      <Router>
        <nav className="button-container">
          <ul>
            <li>
          <NavLink exact to="/" activeClassName="active" className="home-button">
            Home
          </NavLink>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);