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
        // console.log(allBooksResults);
        setAllBooks(allBooksResults);
      } catch (error) {
        console.error("Uh oh! Problems with Promises");
      }
    });
  }, []);

  return (
    <div className="searchContainer">
      
      <form className="search">
      <div className="searchBooksLabel">Search Books to Edit or Delete</div>
        <input
        type="search"
        placeholder="Search by Title, Author, or Description"
          value={searchTerm}
          onChange={(e) => {
            e.preventDefault();
            // console.log(e.target.value);
            setSearchTerm(e.target.value);

            if (e.target.value.length === 0) {
              setBooksToDisplay([]);
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
              console.log(booksToDisplay)
            }
          }}
        ></input>
      </form>

        <div className="searchMap">
          {booksToDisplay.map((book) => {
            return (
              <div key={book.id} className="searchBook">
                <div
                  className="booksImage"
                  onClick={(e) => {
                    buttonHandler(e, `/books/${book.id}`);
                  }}
                >
                  <img src={book.bookImage} />
                </div>
                <div>
                  <div>
                    <div
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
                  <div className="searchButtons">
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
    </div>
  );
};

export default Search;
