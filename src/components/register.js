import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerNewUser } from "../api/api";
import { useSnackbar } from "notistack";

const Register = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

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
        enqueueSnackbar(register.message, { variant: "error" });
      } else {
        enqueueSnackbar(register.message, { variant: "success" });
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setShippingAddress("");
        setPhoneNumber("");
        setLoggedIn(localStorage.getItem("token"));
        navigate("/me");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
      <form
        className="registerForm"
        onSubmit={handleRegister}
        onKeyDown={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
      >
        
          <h1 id="signUpHeader">Sign up!</h1>
        
            <input
              id="email"
              type="email"
              placeholder="Email"
              autoFocus
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
     
            <input
              id="password"
              type="password"
              placeholder="********"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>

            <input
              id="firstName"
              type="text"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
       
            <input
              id="lastName"
              type="text"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>

            <input
              id="address"
              type="text"
              placeholder="Address"
              required
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
            ></input>

            <input
              id="phoneNumber"
              type="tel"
              placeholder="Phone Number"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            ></input>

          <button id="registerButton">Register</button>
        <div></div>
      </form>
  );
};

export default Register;
