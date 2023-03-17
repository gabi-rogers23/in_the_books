import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserCart } from "../api/api";

const ViewUserCart = () => {
  const [cart, setCart] = useState({ items: [] });
  const { userId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserCart(userId).then((cartResults) => {
      try {
        // console.log(cartResults);
        setCart(cartResults);
      } catch (error) {
        console.error("Uh oh! Problems with Promises");
      }
    });
  }, []);
  // console.log(cart.items)
  return (
    <div>
      {cart.items.map((item) => {
        return (
          <div key={item.cartItemId}>
            <h4>{item.title}</h4>
            <div>Price: ${item.price}</div>
            <div>Quantity: {item.quantity}</div>

          </div>
        );
      })}
                  <button
              onClick={(e) => {
                e.preventDefault;
                navigate("/me/viewUsers");
              }}
            >
              Back
            </button>
    </div>
  );
};

export default ViewUserCart;
