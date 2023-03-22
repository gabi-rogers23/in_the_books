const express = require("express");
const router = express.Router();
const {
  getTagById,
  getAllTags,
  createBookTag,
  deleteAllBookTags,
  getBookById,
  addNewTag,
} = require("../database");
const { requireUser } = require("./utils");

//GET all tags

router.get("/", async (req, res, next) => {
  try {
    const tagsList = await getAllTags();
    res.send(tagsList);
  } catch (error) {
    next(error);
  }
});

//GET /tags/:tagId
router.get("/:tagId", async (req, res, next) => {
  try {
    const tag = await getTagById(req.params.tagId);
    // console.log("ROUTES: ", tag)
    res.send(tag);
  } catch (error) {
    next(error);
  }
});

router.patch("/:bookId", requireUser, async (req, res, next) => {
  // console.log(req.params.bookId)
  if (req.user.isAdmin) {
    try {
      // console.log("DELETING");
      await deleteAllBookTags(req.params.bookId);
      // console.log("DELETED");
      // console.log("CREATING", req.body.tags);
      const tagNames = req.body.tags.map((tag) => tag.name);
      await createBookTag(req.params.bookId, tagNames);
      // console.log("CREATED", req.body);
      const book = await getBookById(req.params.bookId);
      // console.log("BOOK", book)
      res.send(book);
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

router.post("/", requireUser, async (req, res, next) => {
  // console.log("Post tags", req.body.tag)
  if (req.user.isAdmin) {
    try {
      const addTag = await addNewTag(req.body.tag);
      res.send(addTag);
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
