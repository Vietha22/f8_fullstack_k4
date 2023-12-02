import { Navigate } from "react-router-dom";

const DefaultPage = () => {
  return <Navigate to={"/product/1"} />;
};

export default DefaultPage;
