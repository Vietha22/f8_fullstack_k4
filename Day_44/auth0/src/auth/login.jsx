import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithPopup } = useAuth0();

  return (
    <button
      className="bg-orange-600 py-1 px-2 rounded text-white"
      onClick={() => loginWithPopup()}
    >
      Log In
    </button>
  );
};

export default LoginButton;
