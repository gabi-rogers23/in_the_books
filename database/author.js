const client = require("./client");

async function createAuthor({
  authorFirstName,
  authorLastName,
  dateOfBirth,
  birthPlace,
  authorImage,
  authorBio,
}) {
  try {
    const {
      rows: [author],
    } = await client.query(
      `INSERT INTO author("authorFirstName", "authorLastName", "dateOfBirth", "birthPlace", "authorImage", "authorBio")
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *;`,
      [
        authorFirstName,
        authorLastName,
        dateOfBirth,
        birthPlace,
        authorImage,
        authorBio,
      ]
    );

    return author;
  } catch (error) {
    throw error;
  }
}

async function getAllAuthors() {
  try {
    const { rows: authors } = await client.query(`
    SELECT * FROM author;
    `);
    // console.log(authors)
    return authors;
  } catch (error) {
    throw error;
  }
}

async function getAuthorById(authorId) {
  try {
    const {
      rows: [author],
    } = await client.query(`SELECT * FROM author WHERE id=${authorId}`);

    return author;
  } catch (error) {
    console.log("Error in getAuthorById");
    throw error;
  }
}

async function updateAuthor({ id, ...fields }) {
  try {
    const updateFields = {};

    if (Object.hasOwn(fields, "authorFirstName")) {
      updateFields.authorFirstName = fields.authorFirstName;
    }
    if (Object.hasOwn(fields, "authorLastName")) {
      updateFields.authorLastName = fields.authorLastName;
    }
    if (Object.hasOwn(fields, "dateOfBirth")) {
      updateFields.dateOfBirth = fields.dateOfBirth;
    }
    if (Object.hasOwn(fields, "authorImage")) {
      updateFields.authorImage = fields.authorImage;
    }
    if (Object.hasOwn(fields, "authorBio")) {
      updateFields.authorBio = fields.authorBio;
    }

    const setString = Object.keys(updateFields)
      .map((key, i) => `"${key}"=$${i + 1}`)
      .join(", ");

    const {
      rows: [updatedAuthor],
    } = await client.query(
    `UPDATE author
    SET ${setString}
    WHERE id=${id}
    RETURNING *;`,
      Object.values(updateFields)
    );

    return updatedAuthor;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
};
