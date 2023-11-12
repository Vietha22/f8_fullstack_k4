import React, { useState } from "react";
import { toast } from "react-toastify";

const TodoItem = ({ todo, deleteTodo, editTodo }) => {
  const [todoItem, setTodo] = useState(todo);
  const [isEdit, setIsEdit] = useState(false);

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const cancelBtn = (todo, isCompleted) => {
    setTodo({ ...todoItem, todo: todo, isCompleted: isCompleted });
    toggleEdit();
  };

  const handleChangeInput = (e) => {
    setTodo({ ...todoItem, todo: e.target.value });
  };

  const handleCheckbox = (e) => {
    setTodo({ ...todoItem, isCompleted: e.target.checked });
  };

  const handleUpdate = () => {
    if (todoItem.todo.trim()) {
      editTodo(todoItem);
    } else {
      toast.warning("Todo cần có trên 1 ký tự");
      return;
    }
    toggleEdit();
  };

  return (
    <li className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
      <div>
        <input
          type="text"
          className={` ${
            todoItem.isCompleted ? "line-through" : ""
          } appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline `}
          readOnly={!isEdit}
          value={todoItem?.todo}
          onChange={handleChangeInput}
        />
      </div>
      <div className="flex items-center justify-between mt-4">
        {isEdit ? (
          <>
            <div className="flex items-center">
              <label htmlFor="check" className="mr-2">
                {todoItem.isCompleted ? "Completed" : "Not completed"}
              </label>
              <input
                type="checkbox"
                name=""
                id="check"
                onChange={handleCheckbox}
                checked={todoItem.isCompleted}
                className={`form-checkbox h-5 w-5 text-gray-600`}
              />
            </div>
            <div className="flex items-center">
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                onClick={() => {
                  cancelBtn(todo.todo, todo.isCompleted);
                }}
              >
                Thoát
              </button>
              <button
                className="bg-teal-500 hover:bg-teal-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                onClick={handleUpdate}
              >
                Update
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                onClick={() => {
                  deleteTodo(todo._id);
                }}
              >
                Xóa
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center">
            <button
              onClick={toggleEdit}
              className="bg-teal-500 hover:bg-teal-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            >
              Sửa
            </button>
            <button
              onClick={() => {
                deleteTodo(todo._id);
              }}
              className="bg-red-500 hover:bg-red-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
            >
              Xóa
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
