import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookById, addToCart } from "../api/api";
import "./app.css"

const BookDetails = () => {
  const [book, setBook] = useState({ tags: [] });
  const { bookId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getBookById(bookId).then((book) => {
      setBook(book);
      // console.log(book)
    });
  }, []);

  function buttonHandler(e, nav) {
    e.preventDefault();
    // console.log("click")
    navigate(nav);
  }

  return (
    <div class="bookDetails">
      <div class="bookImage"><img src={book.bookImage} alt={book.title} /></div>
      <div class="bookInfo">
        <h1 class="bookTitle">{book.title}</h1>
        <div class="bookAuthor">
          <span>By</span>
          <span>{book.authorFirstName} {book.authorLastName}</span>
        </div>
        <div class="bookPrice">${book.price}</div>
        <div class="bookDescription">{book.description}</div>
        <div class="bookTags">
          {book.tags.map((tag) => (
            <span class="tag" key={tag.tagId}>{tag.tag}</span>
          ))}
        </div>
        <div class="bookActions">
          <button class="backButton" onClick={(e) => buttonHandler(e, "/books")}>Back</button>
          <button class="addCartButton">Add to Cart</button>
        </div>
      </div>
      <div class="authorInfo">
        <div class="authorImage"><img src={book.authorImage} alt={`${book.authorFirstName} ${book.authorLastName}`} /></div>
        <div class="authorBio">
          <h2>About the author:</h2>
          <p>{book.authorBio}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
