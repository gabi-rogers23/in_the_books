import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLogIn } from "../api/api";
import "./app.css"


const Login = () => {
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
          console.log(localStorage.getItem("token"))
          setUsername("");
          setPassword("");
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      } 
    };
    return (
      <>
        <form
          onSubmit={handleLogin}
        >
          <div>
            <h1>Log In</h1>
            <div>
            </div>
            <label>
              <input
                type="text"
                placeholder="Username*"
                required
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </label>
  
            <label className="mt-3">
              <input
                type="password"
                placeholder="********"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </label>
  
            <button>
              Submit
            </button>
          </div>
          <div></div>
          
        </form>
      </>
    );
  };
  
  export default Login;
  

  