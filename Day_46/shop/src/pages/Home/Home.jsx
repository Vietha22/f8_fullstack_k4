import React from "react";
import ProductList from "../../components/ProductList/ProductList";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import "./Home.css";
import { useNavigate, useParams } from "react-router-dom";

const Home = () => {
  const totalPage = useSelector((state) => state.product.totalPage);
  const navigate = useNavigate();
  const param = useParams();

  const handlePageClick = (event) => {
    const newPage = event.selected;
    navigate(`/product/${newPage + 1}`);
  };

  return (
    <>
      <ProductList />
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={totalPage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        forcePage={param.page - 1}
      />
    </>
  );
};

export default Home;
