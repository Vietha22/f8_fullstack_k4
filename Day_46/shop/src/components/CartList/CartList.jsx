import React from "react";
import "./CartList.css";
import CartItem from "../CartItem/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartList = () => {
  const cartList = useSelector((state) => state.cart.cartList);
  const dispatch = useDispatch();

  const handleCheckout = () => {
    dispatch({ type: "cart/checkout" });
  };

  return (
    <>
      {cartList.length ? (
        <>
          <h1 id="shopping-cart-heading">Shopping Cart</h1>
          {cartList.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
          <div className="button">
            <Link to={"/product/1"}>
              <button className="btn btn-back">Go home</button>
            </Link>
            <button className="btn btn-checkout" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      ) : (
        <p className="empty">Chưa có gì trong giỏ hàng cả!!!!</p>
      )}
    </>
  );
};

export default CartList;
