const serverApi = `https://q5dsjt-3000.csb.app`;

const getTodos = async () => {
  try {
    const response = await fetch(`${serverApi}/todos`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

const postTodos = async (data) => {
  try {
    const response = await fetch(`${serverApi}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (e) {
    console.log(e.message);
  }
};

const patchTodos = async (id, data) => {
  try {
    const response = await fetch(`${serverApi}/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (e) {
    console.log(e.message);
  }
};

const deleteTodos = async (id) => {
  try {
    const response = await fetch(`${serverApi}/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (e) {
    console.log(e.message);
  }
};

export { getTodos, postTodos, patchTodos, deleteTodos };
