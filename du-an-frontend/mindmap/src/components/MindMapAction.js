"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const MindMapAction = ({ setModalOn, nodes, edges, dataMindMap, isOwner }) => {
  const [title, setTitle] = useState(dataMindMap?.name);
  const [desc, setDesc] = useState(dataMindMap?.description);
  const router = useRouter();
  const saveMap = async (id) => {
    const data = { nodes, edges };

    await axios.patch(`/api/mindMap/${id}`, {
      name: title,
      description: desc,
      data: JSON.stringify(data),
    });
    toast.success("Đã lưu thành công", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    router.refresh();
  };
  return (
    <div className="text-start">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-4/5">
            {" "}
            <h1
              className="text-2xl md:text-4xl font-medium my-2 outline-0"
              contentEditable="true"
              spellCheck="false"
              onBlur={(t) => setTitle(t.currentTarget.innerHTML)}
            >
              {title}
            </h1>
            <p
              className="outline-0"
              contentEditable="true"
              spellCheck="false"
              onBlur={(t) => setDesc(t.currentTarget.innerHTML)}
            >
              {desc}
            </p>{" "}
          </div>
          {isOwner && (
            <div className="w-1/5">
              <div className="flex justify-end items-center">
                <button
                  className="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition py-1 px-2 text-sm rounded text-white border-green-600 bg-green-600 hover:bg-green-700 hover:border-green-700"
                  target="_blank"
                  rel="noopener"
                  onClick={() => saveMap(dataMindMap?.id)}
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
                  onClick={() => setModalOn(true)}
                >
                  <i className="fa-solid fa-share" />
                  <span className="ml-2">Chia sẻ</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MindMapAction;
