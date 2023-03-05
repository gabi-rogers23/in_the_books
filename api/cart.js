const express = require("express");
const router = express.Router();
const { getCartByUserId } = require("../database");
const { requireUser } = require("./utils");

//GET /cart
router.get("/", requireUser, async (req, res, next) => {
try{
    const userCart = await getCartByUserId(req.user.id)
    console.log(userCart)
    res.send(userCart)
}catch(error){
    next(error)
}
})

module.exports = router;
