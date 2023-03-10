const express = require("express");
const { getAllAuthors } = require("../database");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const authors = await getAllAuthors();
    console.log(authors)
    res.send(authors);
  } catch (error) {
    next(error);
  }
});


module.exports = router;