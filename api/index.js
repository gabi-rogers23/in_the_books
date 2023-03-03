const express = require("express");
const router = express.Router();

const booksRouter = require("./books");
router.use("/books", booksRouter);

const tagsRouter = require("./tags");
router.use("/tags", tagsRouter);

router.get("/health", async (req, res, next) => {
    res.status(200).send({
      message: "Server is up and healthy"
    });
  });
  
module.exports = router;
