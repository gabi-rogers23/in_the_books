const client = require("./index");

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

async function getAllBooks() {
  try {
    const { rows: books } = await client.query(`
          SELECT *
          FROM books;
        `);
    return books;
  } catch (error) {
    throw error;
  }
}

async function getFullBookById(bookId) {
    //attach tags
    //attach author info
  try {
    const {
      rows: [book],
    } = await client.query(
      `
            SELECT * 
            FROM books 
            WHERE id=$1;
      `,
      [bookId]
    );

if(!book){
    throw{
        name: "Book Not Found Error", 
        message: "Could not find a book with that bookId"
    };
}

  } catch (error) {
    throw error;
  }
}


module.exports = {
  createBook,
  getAllBooks
};
