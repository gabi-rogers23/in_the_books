const client = require("./index");
const { createAuthor } = require("./author");

async function createBook(
  bookAuthor,
  { title, price, description, bookImage, fiction }
) {
  try {
    let {
      rows: [authorSearch],
    } = await client.query(`
        SELECT * FROM author WHERE ("authorName"='${bookAuthor.authorName}' AND
        "dateOfBirth"='${bookAuthor.dateOfBirth}' AND "birthPlace"='${bookAuthor.birthPlace}');
        `);
    if (!authorSearch) {
        authorSearch = await createAuthor(bookAuthor);
    }


    const {
      rows: [book],
    } = await client.query(
      `
        INSERT INTO books(title, "authorId", price, description, "bookImage", fiction)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `,
      [title, authorSearch.id, price, description, bookImage, fiction]
    );
    
    console.log("CREATE BOOK RETURNING: ", book)

    return book;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createBook,
};
