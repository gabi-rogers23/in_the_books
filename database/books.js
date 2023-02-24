const client = require("./index");
const { createAuthor } = require("./author");

async function createBook(
  bookAuthor,
  { title, price, description, bookImage, fiction }
) {
  try {
    const {
      rows: [authorSearch],
    } = await client.query(`
        SELECT * FROM author WHERE ("authorName"='${bookAuthor.authorName}' AND
        "dateOfBirth"='${bookAuthor.dateOfBirth}' AND "birthPlace"='${bookAuthor.birthPlace}');
        `);


    if (!authorSearch) {
      const author = await createAuthor(bookAuthor);
      const authorId = author.id;
      console.log("Author from CREATE author: ", author)
    }


    const {
      rows: [book],
    } = await client.query(
      `
        INSERT INTO books(title, authorId, price, description, bookImage, fiction)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `,
      [title, authorId, price, description, bookImage, fiction]
    );

    return book;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createBook,
};
