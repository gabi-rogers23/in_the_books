import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookTagForm, AuthorForm } from "./exports";
import { getBookById, updateBook, createNewBook } from "../api/api";
import { useSnackbar } from "notistack";

const BookForm = () => {
  //Book Form State
  const [authorId, setAuthorId] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");
  const [fiction, setFiction] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const { bookId } = useParams();

  useEffect(() => {
    if (bookId != "new") {
      getBookById(bookId).then((book) => {
        try {
          setAuthorId(book.authorId);
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
      <h2>Book Information</h2>
      <form
        className="bookForm"
        onKeyDown={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
      >
        <div>
          <h4>Title: </h4>
          <input
            required
            placeholder="*Required Field"
            value={title}
            onChange={(e) => {
              e.preventDefault();
              setTitle(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <h4>Price $: </h4>
          <input
            required
            placeholder="*Required Field"
            value={price}
            onChange={(e) => {
              e.preventDefault();
              setPrice(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <h4>Description: </h4>
          <textarea
            value={description}
            onChange={(e) => {
              e.preventDefault();
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>
        <div>
          <h4>Link to Image: </h4>
          <input
            value={image}
            onChange={(e) => {
              e.preventDefault();
              setImage(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <h4>Stock: </h4>
          <input
            required
            placeholder="*Required Field"
            value={stock}
            onChange={(e) => {
              e.preventDefault();
              setStock(e.target.value);
            }}
          ></input>
        </div>
        <div className="fiction">
          <h4>Fiction: </h4>
          <div>
            <input
              className="checkbox"
              type="checkbox"
              checked={fiction}
              onChange={(e) => {
                setFiction(e.target.value);
              }}
            ></input>
          </div>
        </div>
      </form>
      <AuthorForm authorId={authorId} setAuthorId={setAuthorId} />
      {/* <BookTagForm book={book} bookToSend={book} /> */}
      <div className="bookFormButtons">
        {bookId != "new" ? (
          <button
            onClick={async (e) => {
              e.preventDefault();
              const updatedBook = await updateBook({
                id: bookId,
                authorId: authorId,
                title: title,
                price: price,
                description: description,
                image: image,
                stock: stock,
                fiction: fiction,
                tags: [],
              });
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
              // console.log(book)
              const newBook = await createNewBook({
                id: bookId,
                authorId: authorId,
                title: title,
                price: price,
                description: description,
                image: image,
                stock: stock,
                fiction: fiction,
                tags: [],
              });
              if (newBook.error) {
                enqueueSnackbar(newBook.message, { variant: "error" });
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
