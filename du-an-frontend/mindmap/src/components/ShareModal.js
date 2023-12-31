"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

const ShareModal = ({ setModalOn, nodes, edges, dataMindMap }) => {
  const router = useRouter();
  const [isPrivate, setIsPrivate] = useState(dataMindMap?.isPrivate);
  const [title, setTitle] = useState("Mindmap không có tên");
  const [desc, setDesc] = useState("Chưa có mô tả");
  const [img, setImg] = useState(
    "http://f8-mindmap.sanphamkythuat.online:880/_next/static/media/so-do-tu-duy.95dad645.jpg"
  );
  const changePrivate = () => {
    setIsPrivate(!isPrivate);
  };
  const saveSeo = async (id) => {
    await axios.patch(`/api/mindMap/${id}`, {
      isPrivate: isPrivate,
      seo_title: isPrivate ? null : title,
      seo_desc: isPrivate ? null : desc,
      seo_img: isPrivate ? null : img,
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
    <div className="fixed z-10 overflow-y-auto top-0 w-full left-0" id="modal">
      <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-900 opacity-75" />
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
            ​
          </span>
          <div
            className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="mx-auto max-w-sm text-center flex flex-wrap justify-center share-option">
                <div className="flex items-center mr-4 mb-4">
                  <input
                    id="radio1"
                    className="hidden"
                    type="radio"
                    defaultValue="private"
                    defaultChecked=""
                    name="mode"
                    checked={isPrivate}
                  />
                  <label
                    onClick={changePrivate}
                    htmlFor="radio1"
                    className="flex items-center cursor-pointer"
                  >
                    <span className="w-4 h-4 inline-block mr-1 rounded-full border border-grey" />
                    Riêng tư
                  </label>
                </div>
                <div className="flex items-center mr-4 mb-4">
                  <input
                    id="radio2"
                    className="hidden"
                    type="radio"
                    defaultValue="public"
                    name="mode"
                    checked={!isPrivate}
                  />
                  <label
                    onClick={changePrivate}
                    htmlFor="radio2"
                    className="flex items-center cursor-pointer"
                  >
                    <span className="w-4 h-4 inline-block mr-1 rounded-full border border-grey" />
                    Công khai
                  </label>
                </div>
              </div>
              {isPrivate && (
                <div>
                  <p>
                    Nếu chọn riêng tư, chỉ có bạn mới được quyền xem Mindmap này
                  </p>
                </div>
              )}
              {!isPrivate && (
                <>
                  <div className="group relative">
                    <label
                      htmlFor="share-input"
                      className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                    >
                      Liên kết chia sẻ
                    </label>
                    <input
                      id="share-input"
                      className="peer h-10 w-full rounded-md bg-gray-50 px-4 drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none"
                      readOnly
                      type="url"
                      defaultValue={`https://f8-fullstack-k4-mindmap.vercel.app/my-mindmap/${dataMindMap?.id}`}
                    />
                  </div>
                  <div className="group relative mt-3">
                    <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                      Tiêu đề
                    </label>
                    <input
                      className="peer h-10 w-full rounded-md bg-gray-50 px-4 drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none"
                      type="text"
                      defaultValue={dataMindMap?.seo_title || title}
                      name="title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="group relative mt-3">
                    <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                      Mô tả
                    </label>
                    <textarea
                      type="text"
                      className="peer h-20 w-full rounded-md bg-gray-50 px-4 drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none"
                      name="description"
                      defaultValue={dataMindMap?.seo_desc || desc}
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </div>
                  <div className="group relative mt-3">
                    <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                      Ảnh chia sẻ
                    </label>
                    <input
                      className="peer h-10 w-full rounded-md bg-gray-50 px-4 drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none"
                      type="url"
                      defaultValue={dataMindMap?.seo_img || img}
                      name="image"
                      onChange={(e) => setImg(e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="bg-gray-200 px-4 py-3 text-right">
              <button
                type="button"
                className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                onClick={() => setModalOn(false)}
              >
                <i className="fas fa-times" /> Đóng
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
                onClick={() => saveSeo(dataMindMap?.id)}
              >
                <i className="fas fa-plus" /> Lưu lại
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
