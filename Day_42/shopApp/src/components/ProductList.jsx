// components/ProductList.js
import React from "react";
import ProductItem from "./ProductItem";

function ProductList({ products, onAddToCart }) {
  return (
    <div className="product-list product-list grid grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductItem
          key={product._id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

export default ProductList;
