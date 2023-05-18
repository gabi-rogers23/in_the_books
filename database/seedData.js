const { faker } = require("@faker-js/faker");
const client = require("./client");

const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  destroyBook,
  getBooksByTag,
  createBookTag,
  createAuthor,
  getAuthorById,
  updateAuthor,
  createUser,
  getCartByUserId,
  createCartItem,
  updateCartItem,
  removeCartItem,
} = require("./index");

async function dropTables() {
  try {
    console.log("Starting to drop tables");
    await client.query(`
    DROP TABLE IF EXISTS book_tags;
    DROP TABLE IF EXISTS cart_items;
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS tags;
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
            "authorFirstName" VARCHAR(255) NOT NULL,
            "authorLastName" VARCHAR(255) NOT NULL,
            "dateOfBirth" VARCHAR(255) NOT NULL,
            "birthPlace" VARCHAR(255) NOT NULL,
            "authorImage" VARCHAR(255),
            "authorBio" VARCHAR
        );
        CREATE TABLE books (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            "authorId" INTEGER REFERENCES author(id),
            price FLOAT(2) NOT NULL,
            description VARCHAR,
            "bookImage" VARCHAR(255),
            stock INTEGER NOT NULL,
            fiction BOOLEAN DEFAULT false NOT NULL
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
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            "firstName" VARCHAR(255) NOT NULL,
            "lastName" VARCHAR(255) NOT NULL,
            "shippingAddress" VARCHAR(255) NOT NULL,
            "phoneNumber" VARCHAR (255) NOT NULL,
            "isAdmin" BOOLEAN DEFAULT false
        );

        CREATE TABLE cart (
            id SERIAL PRIMARY KEY,
            "userId" INTEGER REFERENCES users(id)
        );

        CREATE TABLE cart_items (
            id SERIAL PRIMARY KEY,
            "cartId" INTEGER REFERENCES cart(id),
            "bookId" INTEGER REFERENCES books(id),
            "quantity" INTEGER 
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

    await Promise.all(promises);
    console.log("Authors seeded!");
  } catch (error) {
    console.log("Error in seedAuthors");
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log("Starting to create users with carts...");
    const promises = [];

    for (let i = 0; i < 5; i++) {
      const user = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        shippingAddress: faker.address.streetAddress(),
        phoneNumber: faker.phone.number(),
        isAdmin: false,
      };
      promises.push(createUser(user));
    }
    await Promise.all(promises);

    console.log("Finished creating users with carts!");
  } catch (error) {
    console.log("Error creating users!");
    throw error;
  }
}

async function seedCartItems() {
  try {
    console.log("Starting to seed cart items...");
    const promises = [];

    for (let i = 0; i < 50; i++) {
      const randomBookId = Math.floor(Math.random() * 100) + 1;
      const randomUserId = Math.floor(Math.random() * 5) + 1;
      const randomQuantity = Math.floor(Math.random() * 5) + 1;
      promises.push(createCartItem(randomUserId, randomBookId, randomQuantity));
    }
    await Promise.all(promises);
   
    console.log("Finished seeding cart items!");
  } catch (error) {
    console.log("Error seeding cart items!");
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
        price: faker.finance.amount(15, 200, 2),
        description: faker.lorem.paragraph(),
        bookImage: faker.image.image(400, 550, true),
        stock: faker.random.numeric(2),
        fiction: faker.datatype.boolean(),
      };

      promises.push(createBook(author, randomBook));
    }

    await Promise.all(promises);
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

    await Promise.all(tagPromises);
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
      title: "The Fellowship of the Ring",
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

    const Admin = {
      email: "gr@gmail.com",
      password: "helloThere",
      firstName: "Gabrielle",
      lastName: "Rogers",
      shippingAddress: "1234 Lovely Lane",
      phoneNumber: "123-456-7891",
      isAdmin: true,
    };

    await createUser(Admin);
    await getAllBooks();
    await getBookById(20);
    await createCartItem(6, 7, 3);
    await createCartItem(6, 45, 2);
    await updateBook(bookFields);
    await updateAuthor(authorFields);
    await destroyBook(20);
    await getBooksByTag("Sleek");
    await removeCartItem(26);
    await updateCartItem(27, 4);
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
    await createInitialUsers();
    await seedAuthors();
    await seedBooks();
    await seedTags();
    await seedCartItems();
    await getCartByUserId(4);
    await testDB();
    console.log("Finished Seeding Database!");
  } catch (error) {
    console.log("error during rebuildDB ");
    throw error;
  }
}

module.exports = {
  rebuildDB,
};
