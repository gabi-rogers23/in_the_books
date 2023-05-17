const express = require("express");
const router = express.Router();
const {
  getCartByUserId,
  updateCartItem,
  removeCartItem,
  createCartItem,
  getCartItem,
  deleteAllCartItems,
} = require("../database");
const { requireUser } = require("./utils");

//GET /cart
router.get("/", requireUser, async (req, res, next) => {
  try {
    const userCart = await getCartByUserId(req.user.id);
    // console.log("USER CART", userCart)
    res.send(userCart);
  } catch (error) {
    next(error);
  }
});

router.get("/:userId", requireUser, async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const userCart = await getCartByUserId(req.params.userId);
      // console.log("USER CART", userCart)
      res.send(userCart);
    } catch (error) {
      next(error);
    }
  } else {
    res.status(403).send({
      error: "403 Forbidden",
      message: `${req.user.email} is not an Admin!`,
      name: "Admin Error",
    });
  }
});

router.post("/", requireUser, async (req, res, next) => {
  try {
    // console.log("REQ BODY:", req.body, "REQ USER:", req.user);
    const cart = await getCartByUserId(req.user.id);
    const cartItemTest = await getCartItem(req.body.bookId, cart.cartId);
    // console.log("CART", cart);

    if (cartItemTest) {
      cartItemTest.quantity += req.body.quantity;
      // console.log("QUANTITY", cartItemTest.quantity)
      const updatedCartItem = await updateCartItem(
        cartItemTest.id,
        cartItemTest.quantity
      );
      // console.log("QUANTITY 2", cartItemTest.quantity, updatedCartItem.quantity)
      res.send({ cartItem: updatedCartItem, message: "Added To Cart!" });
    } else {
      const addedBook = await createCartItem(
        cart.cartId,
        req.body.bookId,
        req.body.quantity
      );
      res.send({ cartItem: addedBook, message: "Added To Cart!" });
    }
  } catch (error) {
    console.error(error)
    next(error);
  }
});

router.patch("/", requireUser, async (req, res, next) => {
  try {
    const updatedCartItem = await updateCartItem(
      req.body.cartItemId,
      req.body.quantity
    );
    //   console.log("UPDATED CART ITEM", updatedCartItem)
    res.send(updatedCartItem);
    // }
  } catch (error) {
    next(error);
  }
});

router.delete("/:cartItemId", requireUser, async (req, res, next) => {
  try {
    // console.log("ITEM TO DELETE ", req.params.cartItemId)
    const deletedCartItem = await removeCartItem(req.params.cartItemId);

    res.send({ message: "Deleted!" });
  } catch (error) {
    next(error);
  }
});

//Deletes all cart items by cartId
router.delete("/checkout/:cartId", requireUser, async (req, res, next) => {
  console.log(req.params.cartId);
  try {
    const deleteAll = await deleteAllCartItems(req.params.cartId);
    res.send(deleteAll);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
