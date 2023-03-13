import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookTagForm, AuthorForm } from "./exports";
import { getBookById, updateBook, createNewBook } from "../api/api";

const BookForm = () => {
  //Book Form State
  const [book, setBook] = useState({});
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");
  const [fiction, setFiction] = useState(false);

  const [bookToSend] = useState({});

  const navigate = useNavigate()
  const { bookId } = useParams();

  useEffect(() => {
    if (bookId == "new") {
      setBook(null);
    } else {
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
    <div>
      <h3>Book Information:</h3>
      <form>
        <div>
          Title
          <input
            value={title}
            onChange={(e) => {
              e.preventDefault();
              const title = e.target.value;
              setTitle(title);
              bookToSend.title = title;
            }}
          ></input>
        </div>
        <div>
          Price $
          <input
            value={price}
            onChange={(e) => {
              e.preventDefault();
              const price = e.target.value;
              setPrice(price);
              bookToSend.price = price;
            }}
          ></input>
        </div>
        <div>
          Description
          <input
            value={description}
            onChange={(e) => {
              e.preventDefault();
              const des = e.target.value;
              setDescription(des);
              bookToSend.description = des;
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
              bookToSend.bookImage = pic;
            }}
          ></input>
        </div>
        <div>
          Stock
          <input
            value={stock}
            onChange={(e) => {
              e.preventDefault();
              const stock = e.target.value;
              setStock(stock);
              bookToSend.stock = stock;
            }}
          ></input>
        </div>
        <div>
          Fiction
          <input
            type="checkbox"
            checked={fiction}
            onChange={(e) => {
              const fic = e.target.checked;
              console.log(fic);
              setFiction(fic);
              bookToSend.fiction = fic;
            }}
          ></input>
        </div>
      </form>
      <div>
        <AuthorForm book={book} bookToSend={bookToSend} />
      </div>

      {/* <BookTagForm /> */}
      <button
        onClick={async (e) => {
          e.preventDefault();
          // console.log(bookToSend)
          const book = await createNewBook(bookToSend);
          if(book.error){
            alert(book.error)
          } else {
            setTitle("");
            setPrice("");
            setDescription("");
            setImage("");
            setStock("");
            setFiction(false);
            alert("Book Created!")
            navigate("/me")
          }
        }}
      >
        Create New Book!
      </button>
    </div>
  );
};

export default BookForm;
