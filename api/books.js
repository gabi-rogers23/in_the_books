const express = require("express");
const router = express.Router();
const { getAllBooks, getBookById, getBooksByTagId } = require("../database");

//GET /books
router.get("/", async (req, res, next) => {
  try {
    const books = await getAllBooks();
    res.send(books);
  } catch (error) {
    next(error);
  }
});

//GET /books/:bookId
router.get("/:bookId", async  (req, res, next)=>{
  try{
    const book = await getBookById(req.params.bookId)
    // console.log(book)
    res.send(book);
  }catch(error){
    next(error);
  }
})

//GET /books/:tagId
router.get("/bookTag/:tagId", async (req, res, next)=>{
  try{
    const bookTagList = await getBooksByTagId(req.params.tagId)
    // console.log("HELLO FROM ROUTES", bookTagList)
    res.send(bookTagList);
    
  }catch(error){
    next(error);
  }
})


module.exports = router;