const client = require("./client");

async function createBook(
  author,
  { title, price, description, bookImage, stock, fiction }
) {
  try {
    console.log("author in createbook", author);

    const {
      rows: [book],
    } = await client.query(
      `
        INSERT INTO books(title, "authorId", price, description, "bookImage", stock, fiction)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
        `,
      [title, author.id, price, description, bookImage, stock, fiction]
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
    SELECT b.id AS id, title, "authorId", price, description, "bookImage", stock, fiction, "authorFirstName", "authorLastName", "dateOfBirth", "birthPlace", "authorImage", "authorBio"
    FROM books b 
    JOIN author a 
    ON a.id = b."authorId";
   `);

    const { rows: bookTags } = await client.query(`
   SELECT t.name AS tag, "tagId", "bookId"
   FROM book_tags bt
   JOIN books b ON b.id=bt."bookId"
   JOIN tags t ON t.id=bt."tagId";   
   `);

    books.forEach((book) => {
      book.tags = bookTags.filter((tag) => book.id === tag.bookId);
    });

    // console.log("BOOK AUTHOR ", books);
    // console.log("BOOK TAGS ", bookTags)
    // console.log(books)
    return books;
  } catch (error) {
    throw error;
  }
}

async function getBookById(bookId) {
  try {
    const {
      rows: [book],
    } = await client.query(`
  SELECT b.id AS id, title, "authorId", price, description, "bookImage", stock, fiction, "authorFirstName", "authorLastName", "dateOfBirth", "birthPlace", "authorImage", "authorBio"
  FROM books b 
  JOIN author a
  ON a.id = b."authorId"
  WHERE b.id =${bookId};
  `);

    const { rows: tags } = await client.query(`
SELECT t.name AS tag, "tagId"
FROM book_tags bt
JOIN books b ON b.id=bt."bookId"
JOIN tags t ON t.id=bt."tagId"
WHERE b.id = ${bookId};  
`);

    book.tags = tags;

    // console.log("Book" , book)

    return book;
  } catch (error) {
    throw error;
  }
}

async function updateBook({ id, ...fields }) {
  try {
    const updateFields = {};

    if (Object.hasOwn(fields, "title")) {
      updateFields.title = fields.title;
    }
    if (Object.hasOwn(fields, "price")) {
      updateFields.price = fields.price;
    }
    if (Object.hasOwn(fields, "description")) {
      updateFields.description = fields.description;
    }
    if (Object.hasOwn(fields, "bookImage")) {
      updateFields.bookImage = fields.bookImage;
    }
    if (Object.hasOwn(fields, "fiction")) {
      updateFields.fiction = fields.fiction;
    }

    const setString = Object.keys(updateFields)
      .map((key, i) => `"${key}"=$${i + 1}`)
      .join(", ");

    // console.log (setString)

    const {
      rows: [updatedBook],
    } = await client.query(
      `
UPDATE books
SET ${setString}
WHERE id=${id}
RETURNING *;
`,
      Object.values(updateFields)
    );

    return updatedBook;
  } catch (error) {
    throw error;
  }
}

async function destroyBook(id) {
  try {
    await client.query(`
    DELETE FROM book_tags
    WHERE "bookId"=${id};
    `);

    await client.query(`
    DELETE FROM cart_items
    WHERE "bookId" = ${id};
    `)

    await client.query(`
    DELETE FROM books
    WHERE id=${id};
    `);
  } catch (error) {
    throw error;
  }
}

async function getBooksByTag(tagName){
  try{
    const { rows: books } = await client.query(`
    SELECT b.title AS title, b.id AS id,"bookImage",bt."tagId", "authorFirstName","authorLastName", t.name AS "tagName", price 
    FROM tags t
    JOIN book_tags bt ON t.id=bt."tagId"
    JOIN books b ON b.id=bt."bookId"
    JOIN author a ON a.id=b."authorId"
    WHERE t.name IN ('${tagName}');
    `);
// console.log(books)
    return books;
    
  }catch(error){
    throw error;
  }
}

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  destroyBook,
  getBooksByTag
};
