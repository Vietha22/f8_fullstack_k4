import React, { useEffect } from "react";

import ProductItem from "../ProductItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/middlewares/productMiddleware";

import "./ProductList.css";
import { useParams } from "react-router-dom";

function ProductList() {
  const dispatch = useDispatch();
  const param = useParams();
  useEffect(() => {
    dispatch(getProducts(param.page));
  }, [param.page]);
  const status = useSelector((state) => state.product.status);
  const productList = useSelector((state) => state.product.productList);

  if (status === "error") {
    return <h3 className="error">Đã có lỗi xảy ra</h3>;
  }

  return (
    <>
      <h1 className="product-header">PRODUCTS</h1>
      <div id="flex-container">
        {status !== "idle" &&
          (status === "pending" ? (
            <h3>Loading...</h3>
          ) : (
            productList.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))
          ))}
      </div>
    </>
  );
}

export default ProductList;
