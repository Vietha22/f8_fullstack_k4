//Import từ node_modules
import React from "react";

//Import từ project
import ProductItem from "./ProductItem";
import { useSelector } from "../core/hook";

function ProductList() {
  const products = useSelector((state) => state.products);

  return (
    <div className="product-list product-list grid grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
