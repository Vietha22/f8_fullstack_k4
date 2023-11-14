// components/Cart.js
import React from "react";
import CartItem from "./CartItem";

function Cart({ cartItems, onCheckout }) {
  return (
    <>
      {cartItems.length ? (
        <div className="cart w-full overflow-hidden rounded-lg shadow-xs mt-4">
          <div className="cart-item w-full overflow-x-auto relative">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                  <th className="px-4 py-3">Tên sản phẩm</th>
                  <th className="px-4 py-3">Số lượng</th>
                  <th className="px-4 py-3">Còn lại</th>
                  <th className="px-4 py-3">Tổng tiền</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {cartItems.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </tbody>
            </table>
            <button
              className="bg-green-500 hover:bg-green-700 select-none text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-max relative right-0"
              onClick={onCheckout}
            >
              Thanh toán
            </button>
          </div>
        </div>
      ) : (
        <p className="text-white font-light mt-4">
          Chưa có gì trong giỏ hàng cả!!!!
        </p>
      )}
    </>
  );
}

export default Cart;
