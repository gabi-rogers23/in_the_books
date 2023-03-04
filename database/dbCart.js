const { getBookById } = require("./books");
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
              SELECT * FROM cart WHERE "userId"=${userId}
            `);
    console.log(cart);

    if (!cart) {
      throw {
        error: "error",
        name: "CartNotFound",
        message: "Cart was not found",
      };
    }

    const { rows: cartItems } = await client.query(`
              SELECT "bookId", title, price, quantity,"authorFirstName", "authorLastName"
              FROM cart_items ci
              JOIN cart c ON c.id = ci."cartId"
              JOIN books b ON b.id =ci."bookId"
              JOIN author a ON a.id = b."authorId"
              WHERE "userId"=${userId};
              `);

    cart.items = cartItems;

    console.log(cart);
  } catch (error) {
    throw error;
  }
}

//           async function addToCart(userId, newProductId) {
//             const newCart = await getCartById(userId)

//             newCart.productIds.push(newProductId)

//             const newProductIds = newCart.productIds

//    try {
//      await client.query(`
//          UPDATE cart
//          SET "bookId" = '{${newProductIds}}'

//          WHERE "userId"=${userId}
//          RETURNING *;
//          `)

//      return newCart
//    } catch (error) {
//      throw error;
//    }
//  }

//  async function removeFromCart(userId, newProductId) {

//    const newCart = await getCartById(userId)

//    for (let i = 0; i < newCart.productIds.length; i++) {

//      if (newCart.productIds[i] = newProductId) {

//        const newCart = await getCartById(userId)
//        const newProductIds = newCart.productIds
//        const index = newProductIds.indexOf(newProductId)

//        newProductIds.splice(index, 1)

//        try {
//          await client.query(`
//          UPDATE cart
//          SET "productIds" = '{${newProductIds}}'
//          WHERE "userId"=${userId}
//          RETURNING *;
//          `)

//          return newCart
//        } catch (error) {
//          throw error;
//        }
//      }
//    }
//  }

//  async function updateCart({ userId, ...fields }) {

//    const setString = Object.keys(fields).map(
//      (key, index) => `"${key}"=$${index + 1}`
//    ).join(', ');

//    if (setString.length === 0) {
//      return;
//    }

//    try {
//      if (setString.length > 0) {
//        await client.query(`
//          UPDATE cart
//          SET ${setString}
//          WHERE "userId"=${userId}
//          RETURNING *;
//        `, Object.values(fields));
//      }

//      return await getCartByUserId(userId);
//    } catch (error) {
//      throw error;
//    }

//  }

//  async function destroyCart(userId) {

//    try {
//      const { rows } = await client.query(`
//      DELETE from cart
//      WHERE "userId"=$1
//      RETURNING *;
//    `, [userId]);

//      return rows;
//    } catch (error) {
//      throw error
//    }
//  }

module.exports = {
  createCart,
  getCartByUserId,
  //  destroyCart,
  //  addToCart,
  //  removeFromCart,
  //  updateCart
};
