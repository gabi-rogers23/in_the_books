import React from "react";
import { useState, useEffect } from "react";
import { fetchUserCart, checkoutCart } from "../api/api";
import { CartItem } from "./exports";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";

const Cart = () => {
  const [cart, setCart] = useState({ items: [] });
  const [isEmpty, setIsEmpty] = useState(false);
  // console.log(cart)
 const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar();

  const getUserCart = () => {
    fetchUserCart().then((cartResults) => {
      try {
        setCart(cartResults);
        setIsEmpty(cartResults.items.length === 0); // set isEmpty state
      } catch (error) {
        console.log(error, "Problem with Cart Promises");
      }
    });
  };

  useEffect(() => {
    getUserCart();
  }, []);

  const setPrice = () => {
    try {
      let totalPrice = 0;
      cart.items.forEach((item) => {
        let itemPrice = item.quantity * item.price;
        totalPrice += itemPrice;
      });
      return totalPrice.toFixed(2);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="cartContainer">
      {cart.items.length ? (
        <div>
          <div className="booksListCart">
            {cart.items.map((item) => {
              return (
                <div className="booksMapCart" key={item.cartItemId}>
                  {item.quantity > 0 && (
                    <CartItem item={item} setUpdate={getUserCart} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="cartTotal"> Total: ${setPrice()} </div>
          <div className="booksButtons">
            <button
              onClick={async (e) => {
                e.preventDefault();
                const checkout = await checkoutCart(cart.cartId);
                if (checkout == cart.cartId) {
                  enqueueSnackbar("You've successfully checked out!", {
                    variant: "success",
                  });
                  await getUserCart();
                }
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="cartEmpty">
          Your Cart is Empty! <br />
          <a onClick={((e)=>{
            e.preventDefault();
            navigate("/books")
          })}>Check out all our books!</a>
        </div>
      )}
    </div>
  );
};

export default Cart;
