import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "./assets/background-image.jpg";
import "./app.css"

const Home = () => {
  const navigate = useNavigate();

  const handleShopClick = () => {
    navigate("/books");
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const textStyle = {
    textAlign: "center",
    color: "#ffffff",
  };

  const buttonStyle = {
    backgroundColor: "#ffffff",
    color: "#000000",
    padding: "12px 24px",
    borderRadius: "4px",
    border: "none",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "24px",
  };

  return (
    <div style={backgroundStyle}>
      <div style={textStyle}>
        <h1>Welcome to our Bookstore</h1>
        <p>
          We offer a wide selection of books for all ages and interests. Browse
          our collection today!
        </p>
        <button style={buttonStyle} onClick={handleShopClick} className="shopButton">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Home;