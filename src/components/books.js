import React from "react";
import { useState, useEffect } from "react";
import { getAllBooks } from "../api/api";
import { ListBooks } from "./exports";

const Books = (props) => {
  const [allBooks, setAllBooks] = useState([]);
  const [booksToDisplay, setBooksToDisplay] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    props.setIsLoading(true);
    Promise.all([getAllBooks()]).then(([allBooksResults]) => {
      try {
        setAllBooks(allBooksResults);
        setBooksToDisplay(allBooksResults)
      } catch (error) {
        error.log(error, " Problem with All Books Promises");
      }
      finally{
        props.setIsLoading(false);
      }
    });
  }, []);

  return( 
    <div className="allBookSearch">      
      <form>
        <input
          type="search"
          placeholder="Search by Title, Author, or Description"
          value={searchTerm}
          onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
          onChange={(e) => {
            e.preventDefault();
            // console.log(e.target.value);
            setSearchTerm(e.target.value);

            if (e.target.value.length === 0) {
              setBooksToDisplay(allBooks);
            } else {
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
              setBooksToDisplay(filteredBooks);
              // console.log(booksToDisplay);
            }
          }}
        ></input>
      </form>
    <ListBooks allBooks={booksToDisplay} />
  </div>)
};

export default Books;
