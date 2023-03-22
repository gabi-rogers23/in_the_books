import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookTagForm, AuthorForm } from "./exports";
import { getBookById, updateBook, createNewBook } from "../api/api";
import { useSnackbar } from "notistack";

const BookForm = () => {
  //Book Form State
  const [book, setBook] = useState({ tags: [] });
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");
  const [fiction, setFiction] = useState(false);

  let bookToSend = useRef({});
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const { bookId } = useParams();

  useEffect(() => {
    if (bookId != "new") {
      getBookById(bookId).then((book) => {
        try {
          setBook(book);
          setTitle(book.title);
          setPrice(book.price);
          setDescription(book.description);
          setImage(book.bookImage);
          setStock(book.stock);
          setFiction(book.fiction);
        } catch (error) {
          console.error("Uh oh! Problems with Promises");
        }
      });
    }
  }, []);

  return (
    <div className="bookFormContainer">
      <h3>Book Information:</h3>
      <form
        className="bookForm"
        onKeyDown={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
      >
        <div>
          Title
          <input
            required
            value={title}
            onChange={(e) => {
              e.preventDefault();
              const title = e.target.value;
              setTitle(title);
              bookToSend.current.title = title;
            }}
          ></input>
        </div>
        <div>
          Price $
          <input
            required
            value={price}
            onChange={(e) => {
              e.preventDefault();
              const price = e.target.value;
              setPrice(price);
              bookToSend.current.price = price;
            }}
          ></input>
        </div>
        <div>
          Description
          <input
            className="descriptionInput"
            required
            value={description}
            onChange={(e) => {
              e.preventDefault();
              const des = e.target.value;
              setDescription(des);
              bookToSend.current.description = des;
            }}
          ></input>
        </div>
        <div>
          Link to Image
          <input
            value={image}
            onChange={(e) => {
              e.preventDefault();
              const pic = e.target.value;
              setImage(pic);
              bookToSend.current.bookImage = pic;
            }}
          ></input>
        </div>
        <div>
          Stock
          <input
            required
            value={stock}
            onChange={(e) => {
              e.preventDefault();
              const stock = e.target.value;
              setStock(stock);
              bookToSend.current.stock = stock;
            }}
          ></input>
        </div>
        <div>
          Fiction
          <input
            required
            type="checkbox"
            checked={fiction}
            onChange={(e) => {
              const fic = e.target.checked;
              console.log(fic);
              setFiction(fic);
              bookToSend.current.fiction = fic;
            }}
          ></input>
        </div>
      </form>
      <div>
        <AuthorForm book={book} bookToSend={bookToSend} />
      </div>

      <BookTagForm book={book} bookToSend={bookToSend} />
      <div className="bookFormButtons">
        {bookId != "new" ? (
          <button
            onClick={async (e) => {
              e.preventDefault();
              bookToSend.current.id = bookId;
              console.log("BOOK TO SEND", bookToSend.current);
              const updatedBook = await updateBook(bookToSend.current);
              if (updatedBook.error) {
                enqueueSnackbar(updatedBook.message, { variant: "error" });
              } else {
                enqueueSnackbar("Book Updated!", { variant: "success" });
                navigate("/me");
              }
            }}
          >
            Update Book
          </button>
        ) : (
          <button
            onClick={async (e) => {
              e.preventDefault();
              // console.log(bookToSend.current)
              const book = await createNewBook(bookToSend.current);
              if (book.error) {
                enqueueSnackbar(book.error, { variant: "error" });
              } else {
                setTitle("");
                setPrice("");
                setDescription("");
                setImage("");
                setStock("");
                setFiction(false);
                enqueueSnackbar("Book Created!", { variant: "success" });
                navigate("/me");
              }
            }}
          >
            Create New Book!
          </button>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/me");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BookForm;
