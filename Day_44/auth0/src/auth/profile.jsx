import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Loader from "../components/Loader/Loader";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useAuth0();

  const [isLoading, setLoading] = useState(false);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    setLoading(true);

    emailjs
      .send(
        "service_kuhtj99",
        "template_l4nd85e",
        {
          to_email: form.current[0].defaultValue,
          to_name: user?.name || user?.nickname,
          message: form.current[1].defaultValue,
        },
        "sXN-cm1hpaJ668uhA"
      )
      .then(
        (result) => {
          setLoading(false);
          toast.success("Gửi mail thành công, cảm ơn bạn <3");
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="container">
      <div className="content">
        <div className="user_img">
          <img
            src={user?.picture}
            alt="avt"
            className="rounded-full w-20 h-20"
          />
        </div>
        <form onSubmit={sendEmail} ref={form} className="form_submit">
          <h1 className="username" name="to_name">
            Xin Chào {user?.name || user?.nickname}!
          </h1>
          <label>Email</label>
          <input
            type="email"
            name="to_email"
            defaultValue={user?.email || "example@gmail.com"}
          />
          <label>Message</label>
          <textarea name="message" defaultValue="Hello ae!" />
          <button type="submit">Yêu cầu hỗ trợ</button>
        </form>
        <LogoutButton />
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Profile;
