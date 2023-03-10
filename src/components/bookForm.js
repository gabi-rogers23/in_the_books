import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookTagForm, AuthorForm } from "./exports";
import { getBookById, fetchAllAuthors } from "../api/api";

const BookForm = () => {
  //Book State
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");
  const [fiction, setFiction] = useState(false);
  //Author State
  const [authorList, setAuthorList] = useState([]);
  const [author, setAuthor] = useState("");
  const [authorId, setAuthorId] = useState({});
  //Tags State
  const [bookTags, setBookTags] = useState([]);

  const { bookId } = useParams();

  const [bookToSend, setBookToSend] = useState({});

  useEffect(() => {
      fetchAllAuthors().then((authors) => {
        setAuthorList(authors)});
    if (bookId === "new") {
        return
    } else {
      getBookById(bookId).then(
        (book) => {
          try {
            setTitle(book.title);
            setPrice(book.price);
            setDescription(book.description);
            setImage(book.bookImage);
            setStock(book.stock);
            setFiction(book.fiction);
            setAuthorId(book.authorId);
            
          } catch (error) {
            console.error("Uh oh! Problems with Promises");
          }
        }
      );
      }
  }, []);

  return (
    <div>
      <h3>Book Information</h3>
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
            t
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
        <h3>Author</h3>
        {/* Need a drop down menu with existing tags + option for new tags.  Only show form if newTag is selected  */}
        <fieldset>
          <label>Author</label>
          {/* <span>{author}</span> */}
          <select
            value={author.id}
            // label={} 
            onChange={(e) => {
              e.preventDefault();
              setAuthor(e.target.value);
            }}
          >
            <option>New Author</option>
            {authorList.map((author) => {
                        console.log(author.authorFirstName + " " + author.authorLastName)
              return (
                <option 
                value={author.id} 
                key={author.id}
                label={author.authorFirstName + " " + author.authorLastName}>
                </option>
              );
            })}
          </select>
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Add
          </button>
        </fieldset>
      </div>

      <AuthorForm
        bookToSend={bookToSend}
        authorId={authorId}
        setAuthorId={setAuthorId}
      />
      {/* <BookTagForm /> */}
      {/* Need a drop down menu with existing authors + option for new author.  Only show form if newAuthor is selected  */}
    </div>
  );
};

export default BookForm;
