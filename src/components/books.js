import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBooks, addToCart } from "../api/api";

const Books = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [itemIndex, setItemIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([getAllBooks()]).then(([allBooksResults]) => {
      try {
        setAllBooks(allBooksResults);
      } catch (error) {
        console.log(error, " Problem with All Books Promises");
      }
    });
  }, []);

  function buttonHandler(e, nav) {
    e.preventDefault();
    navigate(nav);
  }

  return (
    <div className="container">
      <h1>SHOP ALL BOOKS</h1>
      <div className="booksList">
        {allBooks.map((book, i) => {
          return (
            <div key={book.id} className="booksMap">
              <div
                className="booksImage"
                onMouseEnter={() => setItemIndex(i)}
                onMouseLeave={() => setItemIndex(null)}
                onClick={(e) => {
                  buttonHandler(e, `/books/${book.id}`);
                }}
              >
                <img src={book.bookImage} />
              </div>
              <div className="booksWords">
                <div>
                  <div className="booksTitle">
                    <b>{book.title}</b>
                  </div>
                  <div className="booksAuthor">
                    By: {book.authorFirstName} {book.authorLastName}
                  </div>
                </div>
                <div className="booksPrice">${book.price}</div>
                <div className="booksButtons">
                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      book.quantity = 1
                      console.log(book)
                      const add = await addToCart(book);
                      console.log(add);
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Books;
