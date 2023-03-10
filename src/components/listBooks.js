import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../api/api";
// const [itemIndex, setItemIndex] = useState(null);

const ListBooks = ({ allBooks }) => {
  const navigate = useNavigate();
  const { tagName } = useParams();
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
                <div>
                  <div
                    className="booksTitle"
                    onClick={(e) => {
                      buttonHandler(e, `/books/${book.id}`);
                    }}
                  >
                    <b>{book.title}</b>
                  </div>
                  <div className="booksAuthor">
                    By: {book.authorFirstName} {book.authorLastName}
                  </div>
                </div>
                <div className="booksPrice">${book.price}</div>
                <div className="booksButtons">
                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      book.quantity = 1;
                      console.log(book)
                      const add = await addToCart(book);
                      alert(add.message);
                    }}
                  >
                    ADD TO CART
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
