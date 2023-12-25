import FlowWithProvider from "@/components/FlowWithProvider";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

const Mindmap = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/api/auth/login");
  }
  return (
    <div className="py-5 mx-auto">
      <div className="text-start">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="w-4/5">
              {" "}
              <h1
                className="text-2xl md:text-4xl font-medium my-2 outline-0"
                contentEditable="true"
                spellCheck="false"
              >
                Mindmap không có tên
              </h1>
              <p
                className="outline-0"
                contentEditable="true"
                spellCheck="false"
              >
                Chưa có mô tả
              </p>{" "}
            </div>
            <div className="w-1/5">
              <div className="flex justify-end items-center">
                <button
                  className="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition py-1 px-2 text-sm rounded text-white border-green-600 bg-green-600 hover:bg-green-700 hover:border-green-700"
                  target="_blank"
                  rel="noopener"
                >
                  <i className="fa-solid fa-save" />
                  <span className="ml-2">Lưu thay đổi</span>
                </button>
                <button
                  className="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition py-1 px-2 text-sm rounded text-white border-blue-600 bg-blue-600 hover:bg-blue-700 hover:border-blue-700"
                  target="_blank"
                  rel="noopener"
                  href="https://www.linkedin.com/shareArticle?mini=true&url=&title=&summary=&source="
                  aria-label="Share on Linkedin"
                >
                  <i className="fa-solid fa-share" />
                  <span className="ml-2">Chia sẻ</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FlowWithProvider />
    </div>
  );
};

export default Mindmap;
