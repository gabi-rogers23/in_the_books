import {React, useState} from "react"

const Register = ({ setIsLoading, setIsLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [errorMsg, setErrorMsg] = useState("Please enter username & password");
    const navigate = useNavigate();
    const handleRegister = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const register = await fetchRegister(username, password);
        if (register.error) {
          setErrorMsg(register.message);
        } else {
          setIsLoggedIn(true);
          setErrorMsg("");
          navigate("/");
        }
        localStorage.setItem("token", register.token);
        setUsername("");
        setPassword("");
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    };
    return (
      <>
        <form
          onSubmit={handleRegister}
          
        >
          <div >
            <h1 >
              Sign up
            </h1>
            <div>
              <h1 >
                {errorMsg}
              </h1>
            </div>
            <label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </label>
  
            <label >
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </label>
  
            <button >
              Register
            </button>
          </div>
          <div ></div>
          <video
          />
        </form>
      </>
    );
  };
  
  export default Register;
  