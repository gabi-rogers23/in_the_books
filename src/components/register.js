import {React, useState} from "react"
import { useNavigate } from "react-router-dom";
import {registerNewUser} from "../api/api"

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
      e.preventDefault();
      try {
        const register = await registerNewUser(username, password, shippingAddress, phoneNumber);
        console.log(register)
        if (register.error) {
          alert(register.message)
        } else {
          setUsername("");
          setPassword("");
          setShippingAddress("");
          setPhoneNumber("");
          navigate("/");
        }
      } catch (error) {
        console.error(error);
      } 

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
            </div>
            <label>
              <input
              type="text"
              placeholder="Username"
              autoFocus
              required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </label>
  
            <label >
              <input
               type="password"
               placeholder="********"
               required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </label>
  
            <button >
              Register
            </button>
          </div>
          <div ></div>
        </form>
      </>
    );
  };
  
  export default Register;
  