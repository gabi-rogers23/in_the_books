import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "./assets/background-image.jpg";
import { getAllBooks } from "../api/api";

const Home = () => {
  const navigate = useNavigate();

  const handleShopClick = () => {
    navigate("/books");
  };

  const [books, setBooks] = useState([]);

  useEffect(() => {
    getAllBooks().then((data) => {
      setBooks(data.slice(0, 6)); 
    });
  }, []);

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
    margin: "0 auto",
    padding: "0 20px",
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
    marginTop: "40px",
    boxShadow: "1px 1px 2px rgba(0,0,0,0.3)",
  };

  const bookStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "40px 0",
    padding: "20px",
    border: "1px solid #cccccc",
    backgroundColor: "#ffffff",

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
        <button style={buttonStyle} onClick={handleShopClick} className="shopButton">
          Shop Now
        </button>
      </div>
      <div>
        <h2 style={{ textAlign: "center", fontSize: "2rem", margin: "40px 0", color:"#ffffff", textShadow: "1px 1px 2px rgba(0,0,0,0.5)"}}>Featured Books</h2>
        <div style={{display: "flex", justifyContent: "space-between", flexWrap: "wrap", padding: "0 40px",}}>
          {books.map((book) => (
      <div style={bookStyle} key={book.id}>
          <img src={book.bookImage} style={imageStyle} />
      <div>
          <h3 style={titleStyle}>{book.title}</h3>
          <p style={authorStyle}>By {book.author}</p>
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