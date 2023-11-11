import React from "react";

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: this.props.todo,
      isEditing: false,
    };
  }

  toggleEdit = () => {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing,
    }));
  };

  cancelBtn = (todo, isCompleted) => {
    this.setState((prevState) => ({
      todo: { ...prevState.todo, todo: todo, isCompleted: isCompleted },
    }));
    this.toggleEdit();
  };

  handleChangeInput = (e) => {
    this.setState((prevState) => ({
      todo: { ...prevState.todo, todo: e.target.value },
    }));
  };

  handleCheckbox = (e) => {
    this.setState((prevState) => ({
      todo: { ...prevState.todo, isCompleted: e.target.checked },
    }));
  };

  handleUpdate = () => {
    if (this.state.todo.todo.trim()) {
      this.props.editTodo(this.state.todo);
    }
    this.toggleEdit();
  };

  render() {
    const { todo, deleteTodo } = this.props;
    return (
      <li className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div>
          <input
            type="text"
            className={` ${
              this.state.todo.isCompleted ? "line-through" : ""
            } appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline `}
            readOnly={!this.state.isEditing}
            value={this.state.todo?.todo}
            onChange={this.handleChangeInput}
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          {this.state.isEditing ? (
            <>
              <div className="flex items-center">
                <label htmlFor="check" className="mr-2">
                  {this.state.todo.isCompleted ? "Completed" : "Not completed"}
                </label>
                <input
                  type="checkbox"
                  name=""
                  id="check"
                  onChange={this.handleCheckbox}
                  checked={this.state.todo.isCompleted}
                  className={`form-checkbox h-5 w-5 text-gray-600`}
                />
              </div>
              <div className="flex items-center">
                <button
                  className="bg-orange-500 hover:bg-orange-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  onClick={() => {
                    this.cancelBtn(todo.todo, todo.isCompleted);
                  }}
                >
                  Thoát
                </button>
                <button
                  className="bg-teal-500 hover:bg-teal-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  onClick={this.handleUpdate}
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
                onClick={this.toggleEdit}
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
  }
}

export default TodoItem;
