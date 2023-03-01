const { faker } = require("@faker-js/faker");
const client = require("./client");
const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  destroyBook,
} = require("./books");
const { createAuthor, getAuthorById, updateAuthor } = require("./author");
const { createBookTag } = require("./tags");
const { createUser } = require("./users");

async function dropTables() {
  try {
    console.log("Starting to drop tables");
    await client.query(`
    DROP TABLE IF EXISTS book_tags;
    DROP TABLE IF EXISTS tags;
    DROP TABLE IF EXISTS books;
    DROP TABLE IF EXISTS author;
    DROP TABLE IF EXISTS users;
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
        );
        
        CREATE TABLE tags (
            id SERIAL PRIMARY KEY,
            name VARCHAR (255) UNIQUE NOT NULL 
        );
        
        CREATE TABLE book_tags (
            "bookId" INTEGER REFERENCES books(id),
            "tagId" INTEGER REFERENCES tags(id), 
            UNIQUE ("bookId", "tagId")
        );  
        
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255),
            password VARCHAR(255),
            "shippingAddress" VARCHAR(255),
            "phoneNumber" VARCHAR (255),
            "isAdmin" BOOLEAN DEFAULT false
        );
        `);
    console.log("Finished building tables");
  } catch (error) {
    console.log("Error building tables");
    throw error;
  }
}

async function seedAuthors() {
  try {
    console.log("Starting to seed authors...");
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

async function createInitialUsers() {
  try {
    console.log("Starting to create users...");
    const admin = await createUser({
      email: faker.internet.email(),
      password: faker.internet.password(),
      shippingAddress: faker.address.streetAddress(),
      phoneNumber: faker.phone.number(),
      isAdmin: true,
    });

    const testUser1 = await createUser({
      email: faker.internet.email(),
      password: faker.internet.password(),
      shippingAddress: faker.address.streetAddress(),
      phoneNumber: faker.phone.number(),
      isAdmin: false,
    });

    // console.log("---INITIAL USERS---", admin, testUser1)

    console.log("Finished creating users");
  } catch (error) {
    console.log("Error creating users");
    throw error;
  }
}

async function seedBooks() {
  try {
    console.log("Creating books...");
    const promises = [];

    for (let i = 0; i < 100; i++) {
      const randomId = Math.floor(Math.random() * 100) + 1;

      let author = await getAuthorById(randomId);

      if (!author) {
        author = await createAuthor({
          authorFirstName: faker.name.firstName(),
          authorLastName: faker.name.lastName(),
          dateOfBirth: faker.date.birthdate(),
          birthPlace: faker.address.city(),
          authorImage: faker.image.avatar(),
          authorBio: faker.lorem.paragraph(),
        });
      }

      const randomBook = {
        title: faker.random.words(),
        price: faker.finance.amount(),
        description: faker.lorem.paragraph(),
        bookImage: faker.image.image(100, 150, true),
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

async function seedTags() {
  try {
    const tagPromises = [];
    console.log("Starting to create tags...");

    for (let i = 0; i < 60; i++) {
      const tagList = [
        faker.commerce.productAdjective(),
        faker.commerce.productAdjective(),
      ];
      const randomId = Math.floor(Math.random() * 100) + 1;
      tagPromises.push(createBookTag(randomId, tagList));
    }

    const tags = await Promise.all(tagPromises);
    console.log("Getting books!");
    //add tags to book
    console.log("Tags Seeded!");
  } catch (error) {
    console.log("Error Seeding Tags!");
    throw error;
  }
}

async function testDB() {
  try {
    const bookFields = {
      id: 20,
      description: "This is a test update",
      title: "Test Title",
      fiction: true,
    };

    const authorFields = {
      id: 20,
      authorBio:
        "J.R.R. Tolkien was an English writer and philologist. He was the author of the high fantasy works The Hobbit and The Lord of the Rings.",
      authorFirstName: "John Ronald Reuel",
      authorLastName: "Tolkien",
      authorImage:
        "https://en.wikipedia.org/wiki/J._R._R._Tolkien#/media/File:J._R._R._Tolkien,_ca._1925.jpg",
    };

    await getAllBooks();
    await getBookById(20);
    await updateBook(bookFields);
    await updateAuthor(authorFields);
    await destroyBook(20);
  } catch (error) {
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
    await seedBooks();
    await seedTags();
    await createInitialUsers();
    await testDB();
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
