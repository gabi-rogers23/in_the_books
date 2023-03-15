import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBooks, deleteBook } from "../api/api";

const Search = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [booksToDisplay, setBooksToDisplay] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  function buttonHandler(e, nav) {
    e.preventDefault();
    navigate(nav);
  }

  useEffect(() => {
    Promise.all([getAllBooks()]).then(([allBooksResults]) => {
      try {
        console.log(allBooksResults);
        setAllBooks(allBooksResults);
        setBooksToDisplay(allBooksResults)
      } catch (error) {
        console.error("Uh oh! Problems with Promises");
      }
    });
  }, []);

  return (
    <div>
      <form className="search">
        <input
          value={searchTerm}
          onChange={(e) => {
            e.preventDefault();
            // console.log(e.target.value);
            setSearchTerm(e.target.value);

            if (e.target.value.length === 0) {
              setBooksToDisplay(allBooks);
            }else{
              const lowercasedSearchTerm = searchTerm.toLowerCase();

              const filteredBooks = allBooks.filter((book) => {
                return (
                  book.title.toLowerCase().includes(lowercasedSearchTerm) ||
                  book.description
                    .toLowerCase()
                    .includes(lowercasedSearchTerm) ||
                  book.authorFirstName
                    .toLowerCase()
                    .includes(lowercasedSearchTerm) ||
                  book.authorLastName
                    .toLowerCase()
                    .includes(lowercasedSearchTerm)
                );
              });
              setBooksToDisplay(filteredBooks)
            }
          }}
        ></input>
        <button
          onClick={(e) => {
            e.preventDefault();
  
          }}
        >
          Search
        </button>
      </form>

      {booksToDisplay ? (
        <div>
          {booksToDisplay.map((book) => {
            return (
              <div key={book.id} className="booksMap">
                <div
                  className="booksImage"
                  onClick={(e) => {
                    buttonHandler(e, `/books/${book.id}`);
                  }}
                >
                  <img src={book.bookImage} />
                </div>
                <div className="booksWords">
                  <div>
                    <div
                      className="booksTitle"
                      onClick={(e) => {
                        buttonHandler(e, `/books/${book.id}`);
                      }}
                    >
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
                        buttonHandler(e, `/bookForm/${book.id}`);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={async (e) => {
                        e.preventDefault();
                        const deletedBook = await deleteBook(book.id);
                        setSearchTerm("");
                        setBooksToDisplay(allBooks);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Search;
