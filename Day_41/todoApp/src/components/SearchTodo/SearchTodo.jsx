import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useDebounce } from "../../hooks/useDebounce.js";

const SearchTodo = ({ searchTodo }) => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  const updateValue = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (debouncedValue) {
      searchTodo(debouncedValue);
    } else {
      searchTodo("");
    }
  }, [debouncedValue]);

  return (
    <form className="w-full max-w-sm" onSubmit={handleSubmit}>
      <div className="flex items-center border-b border-red-500 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none text-white"
          type="text"
          value={value}
          onChange={updateValue}
          autoFocus
          placeholder="Tìm kiếm"
        />
        <button
          type="submit"
          className="focus:outline-none focus:shadow-outline flex-shrink-0 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Tìm kiếm todo
        </button>
      </div>
    </form>
  );
};

export default SearchTodo;
