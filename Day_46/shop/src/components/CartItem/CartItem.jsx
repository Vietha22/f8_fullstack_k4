//Import từ node_modules
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function CartItem({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDecrement = (id) => {
    dispatch({
      type: "cart/decrement",
      payload: id,
    });
  };

  const handleIncrement = (id) => {
    dispatch({
      type: "cart/increment",
      payload: id,
    });
  };

  const handleRemove = (id) => {
    dispatch({
      type: "cart/remove",
      payload: id,
    });
  };

  return (
    <div id="single-cart-container">
      <img
        src={item.image}
        alt="product image"
        onClick={() => navigate(`/details/${item._id}`)}
      />
      <div id="details">
        <span id="brand">{item.brand}</span>
        <span id="title">{item.name}</span>
        <p className="price">
          <span>$</span>
          {item.price}
        </p>
        <p>Còn lại: {item.quantity}</p>
      </div>
      <div id="edit">
        <div id="minus" onClick={() => handleDecrement(item._id)}>
          -
        </div>
        <div id="quantity">{item.quantity_cart}</div>
        <div id="plus" onClick={() => handleIncrement(item._id)}>
          +
        </div>
      </div>
      <div id="price">
        <span id="dolar-span">$</span>
        <span id="price-span">{item.quantity_cart * item.price}</span>
        <span id="trash-icon">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 448 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => handleRemove(item._id)}
          >
            <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>
          </svg>
        </span>
      </div>
    </div>
  );
}

export default CartItem;
