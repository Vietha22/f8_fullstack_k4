import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Header from "./components/Header/Header";
import DefaultPage from "./pages/DefaultPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/product">
          <Route path=":page" element={<Home />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/details">
          <Route path=":id" element={<ProductDetail />} />
        </Route>
        <Route path="*" element={<DefaultPage />} />
      </Routes>
    </>
  );
}

export default App;
