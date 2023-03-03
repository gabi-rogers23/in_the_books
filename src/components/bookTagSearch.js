import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBooksByTag } from "../api/api";

const BookTagSearch = () => {
  const [listBooks, setListBooks] = useState([]);
  const [itemIndex, setItemIndex] = useState(null);
  const { tagName } = useParams();
  const navigate = useNavigate();

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

  function buttonHandler(e, nav) {
    e.preventDefault();
    navigate(nav);
  }


  return (
    <div>
        <h2>{`Books marked as ${tagName}`}</h2>
      {listBooks.map((book, i) => {
        return (
          <div key={book.id} onMouseEnter={() => setItemIndex(i)}
          onMouseLeave={() => setItemIndex(null)}>
            <div>
              <img src={book.bookImage} />
            </div>
            <div>
              <b>Title:</b> {book.title}
            </div>
            {itemIndex === i && (
                <div>
                  <button
                    onClick={(e) => {
                      buttonHandler(e, `/books/${book.id}`);
                    }}
                  >
                    Details
                  </button>
                  <button>Add to Cart</button>
                </div>
              )}
          </div>
        );
      })}
    </div>
  );
};

export default BookTagSearch;
