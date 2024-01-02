"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
const Header = () => {
  const { data } = useSession();
  console.log(useSession());
  const currentUser = data?.user;
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (path) => {
    return path === pathname;
  };
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
          <Link
            href="/"
            className={`p-2 lg:px-4 md:mx-2 ${
              isActive("/")
                ? "text-white rounded bg-indigo-600"
                : "hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
            }`}
          >
            Trang chủ
          </Link>
          <Link
            href="/about"
            className={`p-2 lg:px-4 md:mx-2 ${
              isActive("/about")
                ? "text-white rounded bg-indigo-600"
                : "hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
            }`}
          >
            Giới thiệu
          </Link>
          <Link
            href="/features"
            className={`p-2 lg:px-4 md:mx-2 ${
              isActive("/features")
                ? "text-white rounded bg-indigo-600"
                : "hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
            }`}
          >
            Tính năng
          </Link>
          <Link
            href="/pricing"
            className={`p-2 lg:px-4 md:mx-2 ${
              isActive("/pricing")
                ? "text-white rounded bg-indigo-600"
                : "hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
            }`}
          >
            Bảng giá
          </Link>
          <Link
            href="/contact"
            className={`p-2 lg:px-4 md:mx-2 ${
              isActive("/contact")
                ? "text-white rounded bg-indigo-600"
                : "hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
            }`}
          >
            Liên hệ
          </Link>
          {currentUser && (
            <>
              <span className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-transparent rounded hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-300">
                Hi, {currentUser?.email}
              </span>
              <button
                onClick={() => {
                  router.push("/my-mindmap");
                  router.refresh();
                }}
                className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-transparent rounded hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-300"
              >
                MindMap
              </button>
              <button
                onClick={() => signOut()}
                className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-solid border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1"
              >
                Đăng xuất
              </button>
            </>
          )}
          {!currentUser && (
            <button
              onClick={() => router.push("signIn")}
              className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-solid border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1"
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
