import React from "react";
import { useState, useEffect } from "react";
import { fetchUserCart, updateCart } from "../api/api";
import { CartItem } from "./exports"

const Cart = () => {
  const [cart, setCart] = useState({ items: [] });

  const getUserCart = () => {
    fetchUserCart().then((cartResults) => {
      try {
        setCart(cartResults)
        // console.log("UseEffect CART", cartResults);
      } catch (error) {
        console.log(error, "Problem with Cart Promises");
      }
    });
  }

  useEffect(()=>{
    getUserCart()
  }, [])

  const setPrice = () => {
    try{
      let totalPrice = 0 
      cart.items.forEach((item)=>{
        let itemPrice = item.quantity * item.price
        totalPrice += itemPrice })
        return totalPrice.toFixed(2)
    }catch(error){
    throw error
  }}

  return (
  <div>
    {cart.items.length ? (<div>
      <div className="booksListCart">
     
        {cart.items.map((item) => {
          return (
            <div className="booksMapCart"
            key={item.cartItemId}
            >
              {item.quantity > 0 && <CartItem item={item} setUpdate={getUserCart}/>}
            </div>
          );
        })}
      </div>
     
      <div className="cartTotal"> Total: ${setPrice()} </div>
      </div>) : (<div className="cartEmpty">Your Cart is Empty! <br/> <a href="./books">Check out all our books!</a></div>)}
    
      </div>
    );
};
export default Cart;
