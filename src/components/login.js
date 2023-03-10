import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLogIn } from "../api/api";
import "./app.css"


const Login = ({setLoggedIn}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const login = await fetchLogIn(username, password);
      if (login.error) {
        alert(login.message);
      } else {
        // console.log(localStorage.getItem("token"))
        setUsername("");
        setPassword("");
        setLoggedIn(localStorage.getItem("token"));
        navigate("/me");}

    } catch (error) {
      console.log(error);
    } 
    };
    return (
      <section className="loginForm">
        <form onSubmit={handleLogin}
              className="form">
          <header>
            <h1 className="loginHeader">Log In</h1>
          </header>
          <label className="label1">
            <input id="userInput"
              type="text"
              placeholder="Username*"
              required
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className="label2">
            <input
              type="password"
              placeholder="********"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit" 
                  className="button">
                    Submit</button>
        </form>
      </section>
    );
  };
 
  export default Login;
  

  