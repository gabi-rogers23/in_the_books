import React from "react";
import { useState } from "react";
import { deleteCartItem } from "../api/api"

const CartItem = (props) => {
  const [quantity, setQuantity] = useState(props.item.quantity);

  return (
    <form>
      <div>{props.item.title}</div>
      <input
        value={quantity}
        type="number"
        min={0}
        max={99}
        onChange={(e) => {
          e.preventDefault();
          const newQuantity = e.target.value
          setQuantity(newQuantity);
          props.item.quantity = newQuantity;
        }}
      />
      <button
      onClick={(async (e)=>{
        e.preventDefault();
        const del = await deleteCartItem(props.item.cartItemId)
        console.log(del)
      })}
      >Delete</button>
      <div>{props.item.price}</div>
      <div>
        {props.item.authorFirstName} {props.item.authorLastName}
      </div>
      <br/>
    </form>
  );
};

export default CartItem;
