import LoginButton from "../auth/LoginButton";

const Login = () => {
  return (
    <div className="login_container">
      <h1>Cảm ơn bạn đã sử dụng dịch vụ</h1>
      <p>
        Nếu có bất kỳ câu hỏi hay trợ giúp nào, hãy đăng nhập và đặt câu hỏi tại
        đây!
      </p>
      <LoginButton />
    </div>
  );
};

export default Login;
