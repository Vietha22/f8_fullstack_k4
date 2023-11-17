import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./logout";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const Profile = () => {
  const { user } = useAuth0();

  const [form, setForm] = useState({
    email: user?.email,
    message: "Tôi cần trợ giúp bài tập về nhà!",
    name: user?.name,
  });

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_sej8v9v",
        "template_grkgbhp",
        {
          to_name: form.name,
          to_email: form.email,
          message: form.message,
        },
        "sXN-cm1hpaJ668uhA"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const onChange = (fieldName, value) => {
    setForm((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="text-black/80 bg-white transition-all rounded border border-gray-500 overflow-hidden">
        <div className="p-4 flex flex-col gap-4">
          <div className="border border-[#ccc] flex flex-col  p-4 text-center items-center rounded-lg">
            <div>
              <img
                src={user?.picture}
                alt="avt"
                className="rounded-full w-20 h-20"
              />
            </div>
            <div>
              <h1>Xin Chào {user?.name}!</h1>
            </div>
            <form onSubmit={sendEmail} className="flex flex-col">
              <label>Email</label>
              <input
                type="email"
                name="user_email"
                value={form?.email}
                onChange={(e) => onChange("email", e.target.value)}
              />
              <label>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={(e) => onChange("message", e.target.value)}
              />
              <button className="bg-green-500 text-white" type="submit">
                Yêu cầu hỗ trợ
              </button>
            </form>
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
