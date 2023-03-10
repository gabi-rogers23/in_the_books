const client = require("./client");

async function createCartItem(cartId, bookId, quantity) {
  try {
    const {
      rows: [createItem],
    } = await client.query(
      `
        INSERT INTO cart_items ("cartId", "bookId", quantity)
        VALUES($1, $2, $3)
        RETURNING *;
        `,
      [cartId, bookId, quantity]
    );

   const { rows: [cartItem]} = await client.query(`
   SELECT ci.id, ci."cartId", "bookId", quantity, price, stock, "bookImage"
   FROM cart_items ci
   JOIN books ON books.id = "bookId"
   WHERE ci.id = ${createItem.id};
   `)
    // console.log(cartItem, "created!")
    return cartItem;
  } catch (error) {
    throw error;
  }
}

async function getCartItem(bookId, cartId) {
  try {
    const {
      rows: [cartItem],
    } = await client.query(`
    SELECT cart_items.id, "cartId" "bookId", quantity, price, stock, "bookImage" 
    FROM cart_items 
    JOIN books ON books.id = "bookId" 
    WHERE "bookId"=${bookId} AND "cartId"=${cartId};
    `);
    // console.log(cartItem)

    return cartItem;
  } catch (error) {
    throw error;
  }
}

async function updateCartItem(cartItemId, quantity) {
  try {
    // console.log("quantity in updateCartItem", quantity, cartItemId)
    const {
      rows: [updatedCartItem],
    } = await client.query(
      `
      UPDATE cart_items
      SET quantity='${quantity}'
      WHERE id=${cartItemId}
      RETURNING *;
      `
    );
    // console.log("updatedCartItem", updatedCartItem);
    return updatedCartItem;
  } catch (error) {
    throw error;
  }
}

async function removeCartItem(cartItemId) {
  try {
    await client.query(`
   DELETE FROM cart_items
   WHERE id=${cartItemId};
   `);
    // console.log(`ID ${cartItemId} DELETED`);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCartItem,
  updateCartItem,
  removeCartItem,
  getCartItem,
};
