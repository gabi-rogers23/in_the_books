import React from "react";
import { useState, useEffect } from "react";
import { fetchUserCart, updateCart } from "../api/api";
import { CartItem } from "./exports"

const Cart = () => {
  const [cart, setCart] = useState({ items: [] });
  const [update, setUpdate] = useState(false)

  const getUserCart = () => {
    fetchUserCart().then((cartResults) => {
      try {
        setCart(cartResults);
        // console.log("UseEffect CART", cartResults);
      } catch (error) {
        console.log(error, "Problem with Cart Promises");
      }
    });
  }

useEffect(()=>{
  getUserCart()
}, [update])

  // useEffect(() => {
  //   const cartPromises = cart.items.map((item) => updateCart(item))
  //   const cartItem = Promise.all(cartPromises).catch(console.log)
  //   getUserCart()
  //   setUpdate(false);
  // }, [update]);


  return (<div>
    {cart.items.length ? (<div>
      <div>
        {cart.items.map((item) => {
          return (
            <div
              key={item.cartItemId}
            >
              <CartItem item={item} setUpdate={setUpdate}/>
            </div>
          );
        })}
      </div>
      {/* <button onClick={(e) => {
          e.preventDefault()
          const cartPromises = cart.items.map((item) => updateCart(item))
          const cartItem = Promise.all(cartPromises).catch(console.log)
          getUserCart()
          alert("Cart Updated!")
      }}>Update Cart</button> */}
      </div>) : (<div>Your Cart is Empty! <br/> <a href="./books">Check out all our books!</a></div>)}
    
      </div>);
};
export default Cart;
