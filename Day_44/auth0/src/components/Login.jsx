import LoginButton from "../auth/login";

const Login = () => {
  return (
    <div className="flex justify-center">
      <div className=" mt-10 w-96 border-slate-500 border flex flex-col items-center p-4 gap-y-4">
        <h1>Cảm ơn bạn đã sử dụng dịch vụ</h1>
        <p>
          Nếu có bất kỳ câu hỏi hay trợ giúp nào, hãy đăng nhập và đặt câu hỏi
          tại đây!
        </p>
        <LoginButton />
      </div>
    </div>
  );
};

export default Login;
