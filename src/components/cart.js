import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCart } from "../api/api";

const Cart = () => {
    const [cart, setCart] = useState({});
    const user = 
    useEffect(() => {
        Promise.all([getCart()]).then(([cartResults]) => {
          try {
            setCart(cartResults);
            console.log(cart)
          } catch (error) {
            console.log(error, " Problem with Cart Promises");
          }
        });
      }, []);

 return (<div>Hi from cart</div>)
}

export default Cart;