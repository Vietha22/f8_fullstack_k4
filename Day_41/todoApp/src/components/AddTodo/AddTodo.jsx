import React from "react";

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  updateValue = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.value) return;
    this.props.addTodo(this.state.value);
    this.setState({ value: "" });
  };

  render() {
    return (
      <form className="w-full max-w-sm" onSubmit={this.handleSubmit}>
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none text-white "
            type="text"
            value={this.state.value}
            onChange={this.updateValue}
            autoFocus
            placeholder="Thêm một việc làm mới"
          />
          <button
            type="submit"
            className=" focus:outline-none focus:shadow-outline flex-shrink-0 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            Thêm mới
          </button>
        </div>
      </form>
    );
  }
}

export default AddTodo;
