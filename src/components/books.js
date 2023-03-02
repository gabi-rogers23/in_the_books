import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {getAllBooks} from "../api/api"

const Books = () => {
const [allBooks, setAllBooks] = useState([]);
const navigate = useNavigate();

useEffect(()=>{
    Promise.all([getAllBooks()]).then(([allBooksResults])=>{
try{
    setAllBooks(allBooksResults)
}catch(error){
    console.log(error, " Problem with All Books Promises")
}
    })
}, []);


return(
<div>
    <h1>SHOP</h1>
    <div>
        {allBooks.map((book)=>{
            console.log(book)
            return (
                <div key={book.id}>
                    <div><img src={book.bookImage} width="100"/></div>
                    <div><b>Title:</b> {book.title}</div>
                    <div><b>Author:</b> {book.authorFirstName} {book.authorLastName}</div>
                    <div><b>Price:</b> {book.price}</div>
                    {book.tags.length > 0 && (<div><b>Tags:</b> <ul>{book.tags.map((tag)=>{
                       return( <li key={tag.tagId}>{tag.tag}</li>)
                    })}</ul></div>)}
                    <br/>
                </div>
            )
        })}
    </div>
</div>
)

}

export default Books;