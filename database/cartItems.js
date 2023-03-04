const client = require("./client");

async function createCartItem(cartId, bookId, quantity) {
  try {
    const {
      rows: [cartItem],
    } = await client.query(
      `
        INSERT INTO cart_items ("cartId", "bookId", quantity)
        VALUES($1, $2, $3)
        RETURNING *;
        `,
      [cartId, bookId, quantity]
    );
    console.log(cartItem)
    return cartItem
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCartItem,
};
