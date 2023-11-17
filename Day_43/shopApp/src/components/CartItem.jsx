//Import từ node_modules
import React from "react";

function CartItem({ item }) {
  return (
    <tr className="text-gray-700">
      <td className="px-4 py-3">
        <div className="flex items-center text-sm">
          <p className="font-semibold">{item.name}</p>
        </div>
      </td>
      <td className="px-4 py-3">{item.quantity_cart}</td>
      <td className="px-4 py-3">{item.quantity}</td>
      <td className="px-4 py-3">${item.price * item.quantity_cart}</td>
    </tr>
  );
}

export default CartItem;
