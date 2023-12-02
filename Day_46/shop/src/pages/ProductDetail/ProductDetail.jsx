import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductDetail.css";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getProductDetail } from "../../redux/middlewares/productMiddleware";

const ProductDetail = () => {
  const product = useSelector((state) => state.productDetail.productDetail);
  const status = useSelector((state) => state.productDetail.status);
  const dispatch = useDispatch();
  const param = useParams();

  const handleAddCart = (product) => {
    dispatch({
      type: "cart/add",
      payload: product,
    });
  };

  useEffect(() => {
    dispatch(getProductDetail(param.id));
  }, []);

  if (status === "error") {
    return <h3 className="error">Đã có lỗi xảy ra</h3>;
  }

  return (
    <>
      {status !== "idle" &&
        (status === "pending" ? (
          <h3 className="loading">Loading...</h3>
        ) : (
          <div id="single-product-container">
            <div className="flex-item">
              <img src={product.image} alt="product image" />
            </div>
            <div id="details" className="flex-item">
              <h2 id="brand">{product.brand}</h2>
              <h2 id="title">{product.name}</h2>
              <h2 id="description">{product.description}</h2>
              <span>category: {product.category}</span>
              <Link to={`/product/1`}>
                <button>Go home</button>
              </Link>
              <div id="price-container">
                <h2 id="price">
                  <span>$</span>
                  {product.price}
                </h2>

                <button onClick={() => handleAddCart(product)}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default ProductDetail;
