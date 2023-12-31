"use client";
import { FiEdit, FiTrash } from "react-icons/fi";
import dayjs from "dayjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const MapList = ({ map }) => {
  const router = useRouter();

  const deleteMap = async (id) => {
    if (confirm("Bạn có muốn xóa không?")) {
      await axios.delete(`/api/mindMap/${id}`);
      router.refresh();
    }
  };

  return (
    <>
      <div className="hover:bg-gray-200 cursor-pointer bg-white shadow flex items-center mb-5 rounded-lg">
        <div className="w-1/6 text-center">
          <input type="checkbox" />
        </div>
        <div className="w-1/2">
          <div className="flex items-center">
            <div className="ml-4">
              <span className="capitalize block text-gray-800">
                <Link href={`/my-mindmap/${map.id}`}>{map.name}</Link>
              </span>
              <span className="text-sm block text-gray-600">
                {map.description}
              </span>
            </div>
          </div>
        </div>
        <div className="w-1/4">
          <span className="text-gray-600 text-sm">
            {dayjs(map.createdAt).format("DD/MM/YYYY HH:mm:ss")}
          </span>
        </div>
        <div className="w-1/4 flex">
          <Link
            href={`/my-mindmap/${map.id}`}
            className="text-gray-600 text-sm px-2"
          >
            <FiEdit />
          </Link>
          <span className="text-gray-600 text-sm px-2">
            <FiTrash onClick={() => deleteMap(map.id)} />
          </span>
        </div>
      </div>
    </>
  );
};

export default MapList;
