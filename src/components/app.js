import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from "./login"
import Register from "./register"

const App = () => {
    const [token, setToken] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!token) {
          setIsLoggedIn(false);
        } else {
          const storedToken = localStorage.getItem("token");
          setToken(storedToken);
          setIsLoggedIn(true);
        }
      }, [isLoggedIn, token]);

      useEffect(() => {}, [books]);
      return (
        <>
      <Router>
        <NavBar
          token={token}
          setToken={setToken}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        {isLoading ? <Loading /> : null}
        <div>
          <Routes>
            <Route
              path="/login"
              element={
                <Login
                  setIsLoggedIn={setIsLoggedIn}
                  setIsLoading={setIsLoading}
                />
              }
            />
            <Route
              path="/register"
              element={
                <Register
                  setIsLoggedIn={setIsLoggedIn}
                  setIsLoading={setIsLoading}
                />
              }
            />

          </Routes>
        </div>
        {}
      </Router>
    </>
  );
};




    export default App