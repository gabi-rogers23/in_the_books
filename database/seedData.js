import { faker } from '@faker-js/faker';
const { error } = require("console");
const client = require("./index");


async function dropTables() {
    try {
        await client.query(`
        DROP TABLE IF EXISTS books;
        `);
        console.log("Tables dropped");
        
    }catch(error){
        console.log("Error dropping tables")
    }throw(error);
}

async function createTables() {
    try{
        await client.query(`
        CREATE TABLE author (
            id SERIAL PRIMARY KEY,
            "authorName" VARCHAR(255),
            "dateOfBirth" VARCHAR(255),
            "birthPlace" VARCHAR(255),
            "authorImage" IMAGE,
            "authorBio" VARCHAR(255),
        )

        CREATE TABLE books (
            id SERIAL PRIMARY KEY,
            "authorId" INTEGER REFERENCES author(id),
            price INTEGER,
            description VARCHAR(255),
            "bookImage" IMAGE,
            fiction BOOLEAN DEFAULT false,
        )
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255),
            password VARCHAR(255,
            shippingAddress VARCHAR(255),
            phoneNumber VARCHAR (255),
            "isAdmin" BOOLEAN DEFAULT false
        )
        `)
        console.log("Finished building tables")
    }catch(error) {
        console.log("Error building tables")
        throw(error)
    }
    
}

async function createBooks() {
    try{
        console.log("Creating books...")
        const fakeBooks = [];
        for (let i=0; i<100; i++){
            const randomAuthor = {
                person: faker.person.firstName(),
                birthdate: faker.date.birthdate(),
                image: faker.image.url(),
                lorem: faker.lorem.paragraph()
            };
            fakeBooks.push(randomAuthor)

        }

    } return fakeBooks
}

async function createInitialUsers() {
    try {
      console.log('Starting to create users...')
      const admin = await createUser({
        email: faker.internet.email(), 
        password: faker.internet.password(),
        shippingAddress: faker.address.streetAddress(),
        phoneNumber: faker.phone.number(),
        isAdmin: true
      });
  
      const testUser1 = await createUser({
        email: faker.internet.email(), 
        password: faker.internet.password(),
        shippingAddress: faker.address.streetAddress(),
        phoneNumber: faker.phone.number(),
        isAdmin: false
  
      });
  
      console.log("---INITIAL USERS---", admin, testUser1)
  
      console.log('Finished creating users');
    } catch (error) {
      console.log("Error creating users");
      throw (error);
    }
  }
  

async function rebuildDB() {
    try{
        await dropTables();
    }catch(error){
        console.log("error during rebuildDB");
    throw(error)
    }
};

module.exports = {
    rebuildDB,
    dropTables,
    createTables,
    createInitialUsers
};