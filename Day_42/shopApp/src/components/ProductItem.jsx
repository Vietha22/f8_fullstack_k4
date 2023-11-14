// components/ProductItem.js
import React from "react";

function ProductItem({ product, onAddToCart }) {
  return (
    <div className="product-item box p-4 shadow-lg bg-white rounded-lg relative">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover rounded-t-lg"
      />
      <h2 className="text-xl font-normal mt-2">{product.name}</h2>
      <div className="flex justify-between items-center">
        <span className="text-orange-500 font-bold">${product.price}</span>
        <button
          className="bg-green-500 hover:bg-green-700 select-none text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
          onClick={() => onAddToCart(product)}
        >
          Add to cart!
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
