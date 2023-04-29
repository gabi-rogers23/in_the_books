import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../api/api";
import { formatter } from "../index";
import { useSnackbar } from "notistack";

const ListBooks = ({ allBooks }) => {
  const navigate = useNavigate();
  const { tagName } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  function buttonHandler(e, nav) {
    e.preventDefault();
    navigate(nav);
  }

  return (
    <div className="container">
      {tagName ? (
        <h1>{`Shop Books marked as ${tagName}`}</h1>
      ) : (
        <h1>Shop All Books!</h1>
      )}
      <div className="booksList">
        {allBooks.map((book) => {
          return (
            <div key={book.id} className="booksMap">
              <div
                className="booksImage"
                onClick={(e) => {
                  buttonHandler(e, `/books/${book.id}`);
                }}
              >
                <img src={book.bookImage} />
              </div>
              <div className="booksWords">
                  <div
                    className="booksTitle"
                    onClick={(e) => {
                      buttonHandler(e, `/books/${book.id}`);
                    }}
                  >{book.title}
                  </div>
                  <div className="booksAuthor">
                    By: {book.authorFirstName} {book.authorLastName}
                  </div>
                <div className="booksPrice">
                  ${formatter.format(book.price)}
                </div>
                <div className="booksButtons">
                  <button
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
                    <div className="add"><span className="material-symbols-outlined">add</span><div>Add to
                    Cart</div></div>
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

export default ListBooks;
