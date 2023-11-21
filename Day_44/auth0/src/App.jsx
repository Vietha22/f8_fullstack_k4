import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./auth/profile";
import Login from "./components/Login";
import "./App.css";
import Loader from "./components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {isAuthenticated ? <Profile /> : <Login />}
      <ToastContainer />
    </div>
  );
};

export default App;
