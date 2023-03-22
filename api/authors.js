const express = require("express");
const { getAllAuthors, createAuthor } = require("../database");
const router = express.Router();
const { requireUser } = require("./utils");

router.get("/", async (req, res, next) => {
  try {
    const authors = await getAllAuthors();
    // console.log(authors)
    res.send(authors);
  } catch (error) {
    next(error);
  }
});

router.post("/", requireUser, async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      // console.log(req.body)
      const author = await createAuthor(req.body);
      res.send(author);
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
