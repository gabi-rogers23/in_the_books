const client = require("./index");

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

module.exports = {
  createAuthor,
  getAuthorById,
};
