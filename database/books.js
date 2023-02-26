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
    SELECT b.id AS id, title, "authorId", price, description, "bookImage", fiction, "authorFirstName", "authorLastName", "dateOfBirth", "birthPlace", "authorImage", "authorBio"
    FROM books b 
    JOIN author a 
    ON a.id = b."authorId";
   `);

   const { rows : bookTags } = await client.query(`
   SELECT t.name AS tag, "bookId", "tagId"
   FROM book_tags bt
   JOIN books b ON b.id=bt."bookId"
   JOIN tags t ON t.id=bt."tagId";   
   `)

  books.forEach((book)=>{
    book.tags = bookTags.filter((tag)=>
      book.id === tag.bookId)
  })

    // console.log("BOOK AUTHOR ", books);
    // console.log("BOOK TAGS ", bookTags)
    return books
  } catch (error) {
    throw error;
  }
}

async function getBookById(bookId) {
  try {
  const books = await getAllBooks()

  const book = books.filter((book)=>{
    return book.id === bookId})

    console.log("Book" , book)

    if (!book.title) {
      throw {
        name: "Book Not Found Error",
        message: "Could not find a book with that bookId",
      };
    }else{
      return book;
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createBook,
  getAllBooks,
  getBookById
};
