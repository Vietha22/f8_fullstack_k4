import { getSession } from "@auth0/nextjs-auth0";

const Auth = async () => {
  const session = await getSession();
  return (
    <>
      {session && (
        <>
          <span className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-transparent rounded hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-300">
            Hi, {session.user.name}
          </span>
          <a
            href="/my-mindmap"
            className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-transparent rounded hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-300"
          >
            MindMap
          </a>
          <a
            href="/api/auth/logout"
            className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-solid border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1"
          >
            Đăng xuất
          </a>
        </>
      )}
      {!session && (
        <a
          href="/api/auth/login"
          className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-solid border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1"
        >
          Đăng nhập
        </a>
      )}
    </>
  );
};

export default Auth;
