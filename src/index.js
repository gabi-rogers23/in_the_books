import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Home, Books, NavBar } from "./components/exports"

const App = () => {
  return <div>
    <NavBar />
     <Routes>
    <Route exact strict path="/" element={<Home />} />
    <Route path='/books' element={<Books />} />
    </Routes>
  </div>
};

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);