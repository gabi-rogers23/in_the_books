import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Home,
  Books,
  BookDetails,
  BookTagSearch,
  Homepage,
  Cart,
  NavBar, Login, Register
} from "./components/exports";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:bookId" element={<BookDetails />} />
        <Route path="/booktag/:tagName" element={<BookTagSearch />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
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
