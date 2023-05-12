import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "./assets/background-image.jpg";

const Home = () => {
  const navigate = useNavigate();

  const handleShopClick = () => {
    navigate("/books");
  };

  const [books, setBooks] = useState([]);

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
    maxWidth: "700px",
    marginLeft: "75px",
    padding: "0 20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  
  const h1Style = {
    fontSize: "3rem",
    fontWeight: "bold",
    lineHeight: "1.2",
    marginBottom: "20px",
    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
  };
  
  const pStyle = {
    fontSize: "1.2rem",
    marginBottom: "40px",
    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
  };
  
  const buttonStyle = {
    backgroundColor: "#ffffff",
    color: "#000000",
    padding: "12px 24px",
    borderRadius: "4px",
    border: "none",
    fontSize: "1.2rem",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow: "1px 1px 2px rgba(0,0,0,0.3)",
    textAlign: "center",
    width: "50%",
  };
  
  const bookStyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    margin: "40px 0",
    padding: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    width: "400px",
  };
  
  const imageStyle = {
    width: "150px",
    height: "200px",
    objectFit: "cover",
    marginRight: "20px",
  };
  
  const titleStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
    textTransform: "capitalize",
  };
  
  const authorStyle = {
    fontSize: "1.2rem",
    marginBottom: "10px",
  };
  
  const priceStyle = {
    fontSize: "1.2rem",
    fontWeight: "bold",
  };

  return (
    <div style={backgroundStyle}>
      <div style={textStyle}>
        <h1 style={h1Style}>Welcome to our Bookstore</h1>
        <p style={pStyle}>
          We offer a wide selection of books for all ages and interests. Browse
          our collection today!
        </p>
        <button
          style={buttonStyle}
          onClick={handleShopClick}
          className="shopButton"
        >
          Shop Now
        </button>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            padding: "0 40px",
            height: "600px",
            overflow: "auto",
          }}
        >
          {books.map((book) => (
            <div
              style={bookStyle}
              key={book.id}
              onClick={(e) => {
                e.preventDefault() 
                navigate(`/books/${book.id}`);
              }}
            >
              <img src={book.bookImage} style={imageStyle} />
              <div>
                <h3 style={titleStyle}>{book.title}</h3>
                <p style={authorStyle}>
                  By {book.authorFirstName} {book.authorLastName}
                </p>
                <p style={priceStyle}>${book.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
