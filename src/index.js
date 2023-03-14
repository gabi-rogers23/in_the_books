import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Home,
  Books,
  BookDetails,
  BookTagSearch,
  Cart,
  NavBar, Login, Register, Profile, Footer
} from "./components/exports";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token"))
  return (
    <>
      <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:bookId" element={<BookDetails />} />
        <Route path="/booktag/:tagName" element={<BookTagSearch />} />
        <Route path="/cart" element={<Cart />} onLeave={(()=>{console.log("hi")})}/>
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/register" element={<Register setLoggedIn={setLoggedIn}/>} />
        <Route path="/me" element={<Profile  />} />
      </Routes>
      <Footer />
    </>
  );
};

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
