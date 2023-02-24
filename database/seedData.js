const { faker } = require("@faker-js/faker");
const client = require("./index");
const { createBook } = require("./books");
const { createAuthor, getAuthorById } = require("./author");

async function dropTables() {
  try {
    console.log("Starting to drop tables");
    await client.query(`
        DROP TABLE IF EXISTS books;
        DROP TABLE IF EXISTS author;
        `);
    console.log("Tables dropped");
  } catch (error) {
    console.log("Error dropping tables");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to Create Tables");
    await client.query(`
        CREATE TABLE author (
            id SERIAL PRIMARY KEY,
            "authorFirstName" VARCHAR(255),
            "authorLastName" VARCHAR(255),
            "dateOfBirth" VARCHAR(255),
            "birthPlace" VARCHAR(255),
            "authorImage" VARCHAR(255),
            "authorBio" VARCHAR
        );

        CREATE TABLE books (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255),
            "authorId" INTEGER REFERENCES author(id),
            price FLOAT(2),
            description VARCHAR,
            "bookImage" VARCHAR(255),
            fiction BOOLEAN DEFAULT false
        );`);
    console.log("Finished building tables");
  } catch (error) {
    console.log("Error building tables");
    throw error;
  }
}

async function seedAuthors() {
  try {
    console.log("Starting to seed authors...")
    const promises = [];

    for (let i = 0; i < 75; i++) {
      const fakeAuthor = {
        authorFirstName: faker.name.firstName(),
        authorLastName: faker.name.lastName(),
        dateOfBirth: faker.date.birthdate(),
        birthPlace: faker.address.city(),
        authorImage: faker.image.avatar(),
        authorBio: faker.lorem.paragraph(),
      };

      promises.push(createAuthor(fakeAuthor));
    }

    const authors = await Promise.all(promises);
    console.log("Authors seeded!");
  } catch (error) {
    console.log("Error in seedAuthors");
    throw error;
  }
}

async function createBooks() {
  try {
    console.log("Creating books...");
    const promises = [];

    for (let i = 0; i < 100; i++) {
      const randomId = Math.floor(Math.random() * 100);
      let author = await getAuthorById(randomId);

      if (!author){
       author = await createAuthor({
            authorFirstName: faker.name.firstName(),
            authorLastName: faker.name.lastName(),
            dateOfBirth: faker.date.birthdate(),
            birthPlace: faker.address.city(),
            authorImage: faker.image.avatar(),
            authorBio: faker.lorem.paragraph(),
          })
      }

      const randomBook = {
        title: faker.company.name(),
        price: faker.finance.amount(),
        description: faker.lorem.paragraph(),
        bookImage: faker.image.abstract(),
        fiction: faker.datatype.boolean(),
      };

      promises.push(createBook(author, randomBook));
    }

    const books = await Promise.all(promises);

    console.log("Books seeded!");
  } catch (error) {
    console.log("Error in createBooks");
    throw error;
  }
}


async function rebuildDB() {
  try {
    client.connect();
    console.log("Starting to rebuild DB");
    await dropTables();
    await createTables();
    await seedAuthors();
    await createBooks();
  } catch (error) {
    console.log("error during rebuildDB ");
    throw error;
  }
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
};
