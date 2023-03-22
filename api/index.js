const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const { getUserById } = require("../database");
const { JWT_SECRET } = process.env;

router.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({
        name: "AuthorizationHeaderError",
        message: `Authorization token must start with ${prefix}`,
      });
    }
  }
});

router.use((req, res, next) => {
  if (req.user) {
    // console.log("User is set:", req.user);
  }
  next();
});

const booksRouter = require("./books");
router.use("/books", booksRouter);

const tagsRouter = require("./tags");
router.use("/tags", tagsRouter);

const cartRouter = require("./cart");
router.use("/cart", cartRouter);

const usersRouter = require("./users");
router.use("/users", usersRouter);

const authorsRouter = require("./authors");
router.use("/authors", authorsRouter);

router.get("/health", async (req, res, next) => {
  res.status(200).send({
    message: "Server is up and healthy",
  });
});

module.exports = router;
