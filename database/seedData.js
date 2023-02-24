const { faker } = require('@faker-js/faker');
const { error } = require("console");
const client = require("./index");
const { createBook } = require("./books")


async function dropTables() {
    try {
        console.log("Starting to drop tables")
        await client.query(`
        DROP TABLE IF EXISTS books;
        DROP TABLE IF EXISTS author;
        `);
        console.log("Tables dropped");
        
    }catch(error){
        console.log("Error dropping tables")
        throw error
    }
}

async function createTables() {
    try{
        console.log("Starting to Create Tables")
        await client.query(`
        CREATE TABLE author (
            id SERIAL PRIMARY KEY,
            "authorName" VARCHAR(255),
            "dateOfBirth" VARCHAR(255),
            "birthPlace" VARCHAR(255),
            "authorImage" VARCHAR(255),
            "authorBio" VARCHAR(255)
        );

        CREATE TABLE books (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255),
            "authorId" INTEGER REFERENCES author(id),
            price INTEGER,
            description VARCHAR(255),
            "bookImage" VARCHAR(255),
            fiction BOOLEAN DEFAULT false
        );`)
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
                person: faker.name.fullName(),
                birthdate: faker.date.birthdate(),
                birthPlace: faker.address.city(),
                image: faker.image.avatar(),
                authorBio: faker.lorem.paragraph()
            };

            console.log("Random Author: ", randomAuthor)

            const randomBook = {
                title: faker.company.name(),
                price: faker.finance.amount(),
                description: faker.lorem.paragraph(),
                bookImage: faker.image.abstract(),
                fiction: faker.datatype.boolean() 
            }

            console.log("Random Book ", randomBook)

           await createBook(randomAuthor, randomBook)
        }

    } catch(error){
        console.log("Error Building Books")
        throw error;
    }
}








async function rebuildDB() {
    try{
        client.connect()
        console.log("Starting to rebuild DB")
        await dropTables();
        await createTables();
        await createBooks();
    }catch(error){
        console.log("error during rebuildDB");
    throw error
    }
};

module.exports = {
    rebuildDB,
    dropTables,
    createTables
};