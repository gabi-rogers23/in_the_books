import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookById } from "../api/api";

const BookDetails = () => {
  const [book, setBook] = useState({tags:[]});
  const { bookId } = useParams();
  const navigate = useNavigate();

useEffect(()=>{
    getBookById(bookId).then((book)=>{
        setBook(book)
        // console.log(book)
    })
}, []);

function buttonHandler(e, nav ) {
    e.preventDefault();
    console.log("click")
    navigate(nav);
  }

  return (
    <div className="">
        <div className=""><img src={book.bookImage}/></div>
        <div>
                <b>Title:</b> {book.title}
              </div>
              <div>
                <b>Price:</b> {book.price}
              </div>
              <div>
                <b>Author:</b> {book.authorFirstName} {book.authorLastName}
              </div>
              <div>{book.description}</div><p/>
              <div><img src={book.authorImage}/></div>
              <div>About {book.authorFirstName} {book.authorLastName}: {book.authorBio}</div>
              {book.tags.length > 0 && (
                <div>
                  <b>Tags:</b>{book.tags.map((tag) => {
                      return <div key={tag.tagId} onClick={((e)=> buttonHandler(e, `/booktag/${tag.tag}`))}>{tag.tag} </div>;
                    })}
                
                </div>
              )}
              <button onClick={((e)=>buttonHandler(e, "/books"))}>Back</button><button>Add to Cart</button>

    </div>
  )
};

export default BookDetails;