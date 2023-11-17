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
      <td className="px-4 py-3">{item.quantity}</td>
      <td className="px-4 py-3">${item.price}</td>
      <td className="px-4 py-3">${item.price * item.quantity}</td>
    </tr>
  );
}

export default CartItem;
