import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = ({ setIsLoading, setIsLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("Please enter username & password");
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const login = await fetchLogin(username, password);
        if (login.error) {
          setErrorMsg(login.message);
        } else {
          setIsLoggedIn(true);
          setErrorMsg("");
          navigate("/");
        }
        localStorage.setItem("token", login.token);
        localStorage.setItem("username", login.user.username);
        setUsername("");
        setPassword("");
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
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
              <h1>
                {errorMsg}
              </h1>
            </div>
            <label>
              <input
                type="text"
                placeholder="Username*"
                maxLength="10"
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
                maxLength="8"
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
  