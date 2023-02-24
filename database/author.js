const client = require("./index");

async function createAuthor({authorName, dateOfBirth, birthPlace, authorImage, authorBio}){
    try{
        const {
            rows: [author],
        } = await client.query(
            `INSERT INTO author("authorName", "dateOfBirth", "birthPlace", "authorImage", "authorBio")
            VALUES($1, $2, $3, $4, $5)
            RETURNING *;`, 
            [authorName, dateOfBirth, birthPlace, authorImage, authorBio]
        );

        return author;

    }catch(error){
        throw error;
    }
}

module.exports = {
    createAuthor
}