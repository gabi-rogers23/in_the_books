const express = require("express");
const router = express.Router();
const {
  getCartByUserId,
  updateCartItem,
  removeCartItem,
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

router.patch("/", requireUser, async (req, res, next) => {
  try {
    // console.log("PATCH BODY", req.body)
    if (req.body.quantity == 0) {
      await removeCartItem(req.body.cartItemId);
      res.send();
    } else {
      const updatedCartItem = await updateCartItem(
        req.body.cartItemId,
        req.body.quantity
      );
    //   console.log("UPDATED CART ITEM", updatedCartItem)
      res.send(updatedCartItem);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
