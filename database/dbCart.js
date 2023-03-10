const client = require("./client");

async function createCart(userId) {
  if (!userId) {
    return "User Id Not Found";
  }

  try {
    const {
      rows: [cart],
    } = await client.query(
      `
      INSERT INTO cart("userId") 
      VALUES($1) 
      RETURNING *;
      `,
      [userId]
    );

    //  console.log("CART", cart)
    return cart;
  } catch (error) {
    throw error;
  }
}

async function getCartByUserId(userId) {
  try {
    const {
      rows: [cart],
    } = await client.query(`
              SELECT id AS "cartId", "userId" FROM cart WHERE "userId"=${userId}
            `);
    // console.log(cart);

    if (!cart) {
      throw {
        error: "error",
        name: "CartNotFound",
        message: "Cart was not found",
      };
    }

    const { rows: cartItems } = await client.query(`
              SELECT ci.id AS "cartItemId", "bookId", title, price, quantity, stock, "bookImage", "authorFirstName", "authorLastName"
              FROM cart_items ci
              JOIN cart c ON c.id = ci."cartId"
              JOIN books b ON b.id =ci."bookId"
              JOIN author a ON a.id = b."authorId"
              WHERE "userId"=${userId};
              `);

    cart.items = cartItems;

    // console.log(cart);
    return cart;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCart,
  getCartByUserId,
};
