const express = require("express");
const router = express.Router();
const { getAllBooks, getBookById, getBooksByTag } = require("../database");

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
    console.log(book)
    res.send(book);
  }catch(error){
    next(error);
  }
})

//GET /books/:tag
router.get("/bookTag/:tag", async (req, res, next)=>{
  try{
    const bookTagList = await getBooksByTag(req.params.tag)
    // console.log("HELLO FROM ROUTES", bookTagList)
    res.send(bookTagList);
    
  }catch(error){
    next(error);
  }
})


module.exports = router;