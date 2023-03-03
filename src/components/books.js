import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllBooks } from "../api/api";

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

  function buttonHandler(e, nav ) {
    e.preventDefault();
    navigate(nav);
  }

  return (
    <div>
      <h1>SHOP</h1>
      <div>
        {allBooks.map((book, i) => {
            
          return (
            <div
              key={book.id}
              onMouseEnter={() => setItemIndex(i)}
              onMouseLeave={() => setItemIndex(null)}
            >
              <div>
                <img src={book.bookImage} width="100" />
              </div>
              <div>
                <b>Title:</b> {book.title}
              </div>
              <div>
                <b>Author:</b> {book.authorFirstName} {book.authorLastName}
              </div>
              <div>
                <b>Price:</b> {book.price}
              </div>
              {book.tags.length > 0 && (
                <div>
                  <b>Tags:</b>
                  <ul>
                    {book.tags.map((tag) => {
                      return <li key={tag.tagId}>{tag.tag}</li>;
                    })}
                  </ul>
                </div>
              )}
              {itemIndex === i && (
                <div>
                  <button
                    onClick={(e) => {
                      buttonHandler(e, `/books/${book.id}`);
                    }}
                  >
                    Details
                  </button>
                  <button>Add to Cart</button>
                </div>
              )}
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default Books;

