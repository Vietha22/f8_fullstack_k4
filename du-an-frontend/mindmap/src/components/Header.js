import Link from "next/link";
import Auth from "./Auth";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <nav className="bg-white py-2 md:py-4">
      <div className="container px-4 mx-auto md:flex md:items-center">
        <div className="flex justify-between items-center">
          <Link href="/" className="font-bold text-xl text-indigo-600">
            Viet Mindmap
          </Link>
          <button
            className="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden"
            id="navbar-toggle"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div
          className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0"
          id="navbar-collapse"
        >
          <Navbar />
          <Auth />
        </div>
      </div>
    </nav>
  );
};

export default Header;
