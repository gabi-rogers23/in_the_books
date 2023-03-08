import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBooksByTag } from "../api/api";
import { ListBooks } from "./exports"

const BookTagSearch = () => {
  const [listBooks, setListBooks] = useState([]);

  const { tagName } = useParams();


  useEffect(() => {
    Promise.all([getBooksByTag(tagName)]).then(([bookResults]) => {
      try {
        setListBooks(bookResults);
        console.log(tagResults)
      } catch (error) {
        console.log(error, " Problem with Search Books By tagName Promises");
      }
    });
  }, []);

  return (
    <div>
        
    <ListBooks allBooks={listBooks} />
    </div>
  );
};

export default BookTagSearch;
