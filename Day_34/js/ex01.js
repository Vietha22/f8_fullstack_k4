import { getTodos, postTodos, patchTodos, deleteTodos } from "./api.js";

const notCompletedTodosEl = document.querySelector(".not-completed-todos");
const completedTodosEl = document.querySelector(".completed-todos");
const addBtn = document.querySelector(".btn-add");
const addTodoEl = document.querySelector(".add-todo");

const saveBtn = document.querySelector(".save");
const cancelBtn = document.querySelector(".cancel");
const saveInput = document.querySelector(".add-todo input");

const btnCompleted = document.querySelector(".btn-completed");

const searchInput = document.querySelector(".row input");

let edit = false;
let changeId;
const renderTodos = async () => {
  try {
    const todos = await getTodos();
    const notCompleted = todos.filter((todo) => !todo.completed);
    const completed = todos.filter((todo) => todo.completed);

    const htmlNotCompleted = notCompleted
      .map(
        (todo) => `
    <div class="todo" id="${todo.id}">
        <span>${escapeHTML(todo.name)}</span>
        <div class="controls">
          <span class="btn-delete">
            <i class="fa-regular fa-trash-can"></i>
          </span>
          <span class="btn-edit">
            <i class="fa-solid fa-pen-to-square"></i>
          </span>
          <span class="btn-check">
            <i class="fa-solid fa-check-to-slot"></i>
          </span>
        </div>
      </div>`
      )
      .join("");

    const htmlCompleted = completed
      .map(
        (todo) => `
      <div class="todo" id="${todo.id}">
          <span>${escapeHTML(todo.name)}</span>
          <div class="controls">
            <span class="btn-delete">
              <i class="fa-regular fa-trash-can"></i>
            </span>
            <span class="btn-edit">
              <i class="fa-solid fa-pen-to-square"></i>
            </span>
            <span class="btn-check done">
              <i class="fa-solid fa-check-to-slot"></i>
            </span>
          </div>
        </div>`
      )
      .join("");

    notCompletedTodosEl.innerHTML = htmlNotCompleted;
    completedTodosEl.innerHTML = htmlCompleted;

    btnCompleted.innerHTML = `Completed Todos ${completed.length}`;

    // DELETE
    const deleteBtn = document.querySelectorAll(".btn-delete");
    deleteBtn.forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.closest(".todo").getAttribute("id");
        await deleteTodos(id);
        renderTodos();
      });
    });

    // EDIT
    const editBtn = document.querySelectorAll(".btn-edit");
    editBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        edit = true;
        addTodoEl.classList.add("show");
        saveInput.value = btn.closest(".todo").firstElementChild.textContent;
        changeId = btn.closest(".todo").getAttribute("id");
      });
    });

    // CHECK COMPLETE
    const checkBtn = document.querySelectorAll(".btn-check");
    checkBtn.forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.closest(".todo").getAttribute("id");
        if (btn.classList.contains("done")) {
          await patchTodos(id, {
            completed: false,
          });
        } else {
          await patchTodos(id, {
            completed: true,
          });
        }
        renderTodos();
      });
    });
  } catch (e) {
    console.log(e.message);
  }
};
await renderTodos();

// Update Todos
addBtn.addEventListener("click", () => {
  addTodoEl.classList.add("show");
  saveInput.value = "";
});

saveBtn.addEventListener("click", async () => {
  if (!edit) {
    if (saveInput.value.trim()) {
      await postTodos({
        name: saveInput.value,
        completed: false,
      });
      renderTodos();
      addTodoEl.classList.remove("show");
    } else {
      console.log("Lỗi");
    }
  } else {
    if (saveInput.value.trim()) {
      await patchTodos(changeId, {
        name: saveInput.value,
      });
      edit = false;
      addTodoEl.classList.remove("show");
      renderTodos();
    } else {
      console.log("Lỗi");
    }
  }
});

cancelBtn.addEventListener("click", () => {
  addTodoEl.classList.remove("show");
});

// Show Completed Todos
btnCompleted.addEventListener("click", () => {
  btnCompleted.classList.toggle("show");
});

// Search Event
searchInput.addEventListener("input", () => {
  const todosList = document.querySelectorAll(".todo");
  todosList.forEach((todo) => {
    if (todo.textContent.includes(searchInput.value.trim())) {
      todo.style.display = "flex";
    } else {
      todo.style.display = "none";
    }
  });
});

// XSS prevention
function escapeHTML(unsafe_str) {
  return unsafe_str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/\'/g, "&#39;")
    .replace(/\//g, "&#x2F;");
}
