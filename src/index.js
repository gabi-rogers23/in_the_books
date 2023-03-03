import React from 'react';
import { createRoot, } from "react-dom/client";
import "./components/app.css";
import { Route, Routes, BrowserRouter, Router, NavLink, createBrowserRouter } from "react-router-dom";
import {Home, NavBar, Books} from "./components/exports"

const App = () => {
  return (
      <>
      <NavBar />
          <Routes>
              <Route path="/" element={<Home/>}>
     
              </Route>

              <Route path="/books" element={<Books/>}>
    
              </Route>
                      
          </Routes>
  
      </>
  )
  }

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
    
  </BrowserRouter>
);
