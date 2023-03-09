import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBooksByTag } from "../api/api";
import { ListBooks } from "./exports"

const BookTagSearch = () => {
  const [allBooks, setAllBooks] = useState([]);

  const { tagName } = useParams();


  useEffect(() => {
    Promise.all([getBooksByTag(tagName)]).then(([bookResults]) => {
      try {
        setAllBooks(bookResults);
        console.log(allBooks)
      } catch (error) {
        console.log(error, " Problem with Search Books By tagName Promises");
      }
    });
  }, []);

  return (
    <div>
        
    <ListBooks allBooks={allBooks} />
    </div>
  );
};

export default BookTagSearch;
