import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookById, addToCart } from "../api/api";

const BookDetails = () => {
  const [book, setBook] = useState({ tags: [] });
  const { bookId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getBookById(bookId).then((book) => {
      try {
        setBook(book);
      } catch (error) {
        throw error;
      }
      // console.log(book)
    });
  }, []);

  function buttonHandler(e, nav) {
    e.preventDefault();
    // console.log("click")
    navigate(nav);
  }

  return (
    <div className="bookDetails">
      <div id="bookImage" width="300px">
        <img width="200px" src={book.bookImage} />
      </div>
      <div id="bookTitle">
        <b>Title:</b> {book.title}
      </div>
      <div id="bookPrice">
        <b>Price:</b> {book.price}
      </div>
      <div id="bookAuthor">
        <b>Author:</b> {book.authorFirstName} {book.authorLastName}
      </div>
      <div id="bookDes">{book.description}</div>
      <p />
      <div id="bookAuthorImage">
        <img src={book.authorImage} />
      </div>
      <div id="authorAbout">
        About {book.authorFirstName} {book.authorLastName}: {book.authorBio}
      </div>
      {book.tags.length > 0 && (
        <div className="bookTags">
          <b id="tags">Tags:</b>
          {book.tags.map((tag) => {
            return (
              <div
                id="tagInputs"
                key={tag.tagId}
                onClick={(e) => buttonHandler(e, `/booktag/${tag.tag}`)}
              >
                {tag.tag}{" "}
              </div>
            );
          })}
        </div>
      )}
      <button id="backButton" onClick={(e) => buttonHandler(e, -1)}>
        Back
      </button>
      <button id="addCartButton">Add to Cart</button>
    </div>
  );
};

export default BookDetails;
