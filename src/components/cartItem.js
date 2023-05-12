import React from "react";
import { useState, useEffect } from "react";
import { deleteCartItem, updateCart } from "../api/api";
import { formatter } from "../index";

const CartItem = (props) => {
  const [quantity, setQuantity] = useState(props.item.quantity);

  useEffect(() => {}, [quantity]);
  // console.log(props.item)

  return (
    <form className="cartItemContainer">
      <img className="booksImage" src={props.item.bookImage} />
      <div className="cartItemDetails">
      <div className="booksTitle">{props.item.title}</div>
      <div>${formatter.format(props.item.price)}</div>
      <div>
        By: {props.item.authorFirstName} {props.item.authorLastName}
      </div>
      <input
        className="cartItemValue"
        value={quantity}
        type="number"
        min={0}
        max={99}
        onChange={(e) => {
          e.preventDefault();
          const newQuantity = e.target.value;
          setQuantity(newQuantity);
          props.item.quantity = newQuantity;
        }}
        onMouseLeave={async (e) => {
          e.preventDefault();
          await updateCart(props.item);
          props.setUpdate(true);
        }}
        />

      <div className="booksButtons">
      <button
        onClick={async (e) => {
          e.preventDefault();
          const del = await deleteCartItem(props.item.cartItemId);
          props.setUpdate();
          console.log(del);
        }}
        >
        Delete
      </button>
      </div>
        </div>
    </form>
  );
};

export default CartItem;
