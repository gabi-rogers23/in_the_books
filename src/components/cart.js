import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserCart, updateCart } from "../api/api";
import { CartItem } from "./exports"

const Cart = () => {
  const [cart, setCart] = useState({ items: [] });

  const getUserCart = () => {
    fetchUserCart().then((cartResults) => {
      try {
        setCart(cartResults);
        console.log("UseEffect CART", cartResults);
      } catch (error) {
        console.log(error, "Problem with Cart Promises");
      }
    });
  }

  useEffect(() => {
    getUserCart()
  }, []);
  return (
    <div>
    <div>
      {cart.items.map((item) => {
        return (
          <div
            key={item.cartItemId}
          >
            <CartItem item={item} />
          </div>
        );
      })}
    </div>
    {cart.items.length && <button onClick={(e) => {
        e.preventDefault()
        const cartPromises = cart.items.map((item) => updateCart(item))
        Promise.all(cartPromises)
        .catch(console.log)
        getUserCart()
    }}>Update Cart</button>}
    </div>
  );
};
export default Cart;
