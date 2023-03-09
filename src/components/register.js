import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerNewUser } from "../api/api";

const Register = ({setLoggedIn}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const register = await registerNewUser(
        email,
        password,
        firstName,
        lastName,
        shippingAddress,
        phoneNumber
      );
      // console.log(register);
      if (register.error) {
        alert(register.message);
      } else {
        alert(register.message)
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setShippingAddress("");
        setPhoneNumber("");
        setLoggedIn(localStorage.getItem("token"))
        navigate("/me");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form onSubmit={handleRegister}>
        <div>
          <h1>Sign up!</h1>
          <div></div>
          <label>
            <input
              type="email"
              placeholder="email"
              autoFocus
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </label>

          <label>
            <input
              type="password"
              placeholder="********"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </label>

          <label>
            <input
              type="text"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
          </label>

          <label>
            <input
              type="text"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          </label>

          <label>
            <input
              type="text"
              placeholder="Address"
              required
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
            ></input>
          </label>

          <label>
            <input
              type="tel"
              placeholder="Phone Number"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            ></input>
          </label>

          <button>Register</button>
        </div>
        <div></div>
      </form>
    </>
  );
};

export default Register;
