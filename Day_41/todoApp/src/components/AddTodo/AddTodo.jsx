import React, { useState } from "react";
import { toast } from "react-toastify";

const AddTodo = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const updateValue = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.length < 2) {
      toast.warning("Todo cần có trên 1 ký tự");
      return;
    }
    addTodo(value);
    setValue("");
  };

  return (
    <form className="w-full max-w-sm" onSubmit={handleSubmit}>
      <div className="flex items-center border-b border-teal-500 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none text-white"
          type="text"
          value={value}
          onChange={updateValue}
          autoFocus
          placeholder="Thêm một việc làm mới"
        />
        <button
          type="submit"
          className="focus:outline-none focus:shadow-outline flex-shrink-0 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Thêm mới
        </button>
      </div>
    </form>
  );
};

export default AddTodo;
