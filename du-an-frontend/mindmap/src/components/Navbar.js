"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
const Navbar = () => {
  const pathname = usePathname();
  const isActive = (path) => {
    return path === pathname;
  };
  return (
    <>
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
    </>
  );
};

export default Navbar;
