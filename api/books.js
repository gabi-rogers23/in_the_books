const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  getBooksByTag,
  createBook,
  updateBook,
  destroyBook,
} = require("../database");
const { requireUser } = require("./utils");

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
router.get("/:bookId", async (req, res, next) => {
  try {
    const book = await getBookById(req.params.bookId);
    // console.log(book)
    res.send(book);
  } catch (error) {
    next(error);
  }
});

//GET /books/:tag
router.get("/bookTag/:tag", async (req, res, next) => {
  try {
    const bookTagList = await getBooksByTag(req.params.tag);
    // console.log("HELLO FROM ROUTES", bookTagList)
    res.send(bookTagList);
  } catch (error) {
    next(error);
  }
});

//POST new book
router.post("/", requireUser, async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      // console.log(req.body)
      const author = { id: req.body.authorId };
      const newBook = await createBook(author, req.body);
      await createBook
      res.send(newBook);
    } catch (error) {
      next(error);
    }
  } else {
    res.status(403).send({
      error: "403 Forbidden",
      message: `${req.user.email} is not an Admin!`,
      name: "Admin Error",
    });
  }
});

router.patch("/:bookId", requireUser, async (req, res, next) => {
  if (req.user.isAdmin) {
    // console.log("Patch book ", req.body)
    try {
      const updatedBook = await updateBook(req.body);
      res.send(updatedBook);
    } catch (error) {
      next(error);
    }
  } else {
    res.status(403).send({
      error: "403 Forbidden",
      message: `${req.user.email} is not an Admin!`,
      name: "Admin Error",
    });
  }
});

router.delete("/:bookId", requireUser, async (req, res, next) => {
  // console.log(req.params.bookId)
  if (req.user.isAdmin) {
    try {
      const deleteBook = await destroyBook(req.params.bookId);
      res.send({ message: "Book Deleted!" });
    } catch (error) {
      next(error);
    }
  } else {
    res.status(403).send({
      error: "403 Forbidden",
      message: `${req.user.email} is not an Admin!`,
      name: "Admin Error",
    });
  }
});

module.exports = router;
