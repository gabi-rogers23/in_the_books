import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookById, addToCart } from "../api/api";
import { formatter } from "../index";
import { useSnackbar } from "notistack";


const BookDetails = () => {
  const [book, setBook] = useState({ tags: [] });
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getBookById(bookId).then((book) => {
      try {
        setBook(book);
      } catch (error) {
        throw error;
      }
      // console.log(book)
    });
  }, []);

  function buttonHandler(e, nav) {
    e.preventDefault();
    // console.log("click")
    navigate(nav);
  }

  return (
    <div className="bookDetails">
      <div className="bookImage">
        <img src={book.bookImage} alt={book.title} />
      </div>
      <div className="bookInfo">
        <h1 className="bookTitle">{book.title}</h1>
        <div className="bookAuthor">
          <span>By</span>
          <span>
            {book.authorFirstName} {book.authorLastName}
          </span>
        </div>
        <div className="bookPrice">${formatter.format(book.price)}</div>
        <div className="bookDescription">{book.description}</div>
        <div className="bookTags">
          {book.tags.map((tag) => (
            <span
              className="tag"
              key={tag.tagId}
              onClick={(e) => buttonHandler(e, `/booktag/${tag.tag}`)}
            >
              {tag.tag}
            </span>
          ))}
        </div>
        <div className="bookActions">
          <button
            className="backButton"
            onClick={(e) => buttonHandler(e, "/books")}
          >
            Back
          </button>
          <button
          className="addCartButton"
                    onClick={async (e) => {
                      e.preventDefault();
                      book.quantity = 1;
                      // console.log(book)
                      const add = await addToCart(book);

                      if (add.error) {
                        enqueueSnackbar(add.message, { variant: "warning" });
                      } else {
                        enqueueSnackbar(add.message, { variant: "success" });
                      }
                    }}
                  >
                    <span className="material-symbols-outlined">add</span>Add to
                    Cart
                  </button>
        </div>
      </div>
      <div className="authorInfo">
        <div className="authorImage">
          <img
            src={book.authorImage}
            alt={`${book.authorFirstName} ${book.authorLastName}`}
          />
        </div>
        <div className="authorBio">
          <h2>About the author:</h2>
          <p>{book.authorBio}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
