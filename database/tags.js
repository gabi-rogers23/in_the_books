const client = require("./index");
const {} = require("./books");

async function createTags(tagList) {
  if (tagList.length === 0) {
    return;
  }
//   console.log("TAG LIST: ", tagList)

  const insertValues = tagList.map((_, index) => `$${index + 1}`).join("), (");

  const selectValues = tagList.map((_, index) => `$${index + 1}`).join(", ");

  try {
    await client.query(
      `INSERT INTO tags(name)
            VALUES (${insertValues})
            ON CONFLICT (name) DO NOTHING;`,
      tagList
    );

    const { rows } = await client.query(
      `SELECT * FROM tags
            WHERE name IN (${selectValues});`,
      tagList
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function createBookTag(bookId, tagList) {
  try {
      const createdTags = await createTags(tagList);
     for (let i=0; i < createdTags.length; i++) {
         const tag = createdTags[i]
        // console.log("createdTAG ", tag)

      const {
        rows: [bookTag],
      } = await client.query(
        `
            INSERT INTO book_tags("bookId", "tagId")
            VALUES ($1, $2)
            ON CONFLICT ("bookId", "tagId") DO NOTHING
            RETURNING *;
            `,
        [bookId, tag.id]
      );
      // console.log("Book Tags ", bookTag);
    };
 
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createTags,
  createBookTag,
};