import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./auth/profile";
import Login from "./components/Login";

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return <div>{isAuthenticated ? <Profile /> : <Login />}</div>;
};

export default App;
