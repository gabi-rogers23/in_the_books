const client = require("./index");
const { createAuthor, getAuthorById } = require("./author");

async function createBook(
  bookAuthor,
  { title, price, description, bookImage, fiction }
) {
  try {
    // console.log("author in createbook", author);

    const {
      rows: [book],
    } = await client.query(
      `
        INSERT INTO books(title, "authorId", price, description, "bookImage", fiction)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `,
      [title, bookAuthor.id, price, description, bookImage, fiction]
    );

    // console.log("CREATE BOOK RETURNING: ", book)

    return book;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createBook,
};
