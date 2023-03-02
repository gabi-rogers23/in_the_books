const client = require("./index");




async function createCart () {
    try{
        await client.query(`
        CREATE TABLE "cartItems"(
            "bookId" INTEGER,
            "cartId" INTEGER,
        )`)
    }
}