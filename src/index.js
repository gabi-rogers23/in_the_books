import React, {useState} from "react";
import { createRoot } from "react-dom/client";
import { Home, Books, NavBar, BookDetails, BookTagSearch } from "./components/exports"
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
      <Routes>
    <Route exact strict path="/" element={<Home />} />
    <Route path='/books' element={<Books />} />
    <Route path="/books/:bookId" element={<BookDetails />} />
    <Route path='/booktag/:tagName' element={<BookTagSearch/>} />
    </Routes>
    </div>
  );
};

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)