import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Home,
  Books,
  BookDetails,
  BookTagSearch,
  Homepage,
  Cart
} from "./components/exports";
import { BrowserRouter, Route, NavLink, Routes } from "react-router-dom";

const App = () => {
  // const [token, setToken] = useState(localStorage.getItem("loginData"))
  // console.log(localStorage.getItem("loginData"))
  return (
    <div className="app">
      <nav className="button-container">
        <ul>
          <li>
            <NavLink
              exact
              to="/"
              activeclassname="active"
              className="home-button"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/books">Shop</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:bookId" element={<BookDetails />} />
        <Route path="/booktag/:tagName" element={<BookTagSearch />} />
        <Route path="/cart" element={<Cart />} />
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
);
