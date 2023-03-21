import React from "react";
import { useState, useEffect } from "react";
import { getAllBooks } from "../api/api";
import "./app.css";
import { ListBooks } from "./exports";

const Books = () => {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    Promise.all([getAllBooks()]).then(([allBooksResults]) => {
      try {
        setAllBooks(allBooksResults);
      } catch (error) {
        console.log(error, " Problem with All Books Promises");
      }
    });
  }, []);

  return <ListBooks allBooks={allBooks} />;
};

export default Books;
