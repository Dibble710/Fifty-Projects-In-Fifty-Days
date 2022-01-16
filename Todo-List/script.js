const form = document.getElementById("form");
const input = document.getElementById("input");
const todosList = document.getElementById("todos");
const todosLi = document.querySelectorAll("li");

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach((todo) => addTodo(todo));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo();
});

function addTodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const todoEl = document.createElement("li");
    if (todo && todo.completed) {
      todoEl.classList.add("completed");
    }

    todoEl.innerText = todoText;

    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");
      updateLocalStorage();
    });
    // Long press el to delete
    var pressTimer;
    $(todoEl)
      .mouseup(function () {
        clearTimeout(pressTimer);
        // Clear timeout
        return false;
      })
      .mousedown(function () {
        // Set timeout
        pressTimer = window.setTimeout(function () {
          todoEl.remove();
          updateLocalStorage();
        }, 500);
        return false;
      });

    todosList.appendChild(todoEl);

    input.value = "";

    updateLocalStorage();
  }
}

function updateLocalStorage() {
  let todosEl = document.querySelectorAll("li");

  const todos = [];

  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
  todosLi.forEach((todoItem) => todoItem.innerText("div"));
}

var pressTimer;

$(todoEl)
  .mouseup(function () {
    clearTimeout(pressTimer);
    // Clear timeout
    return false;
  })
  .mousedown(function () {
    // Set timeout
    pressTimer = window.setTimeout(function () {
      todoEl.remove();
      updateLocalStorage();
    }, 1000);
    return false;
  });
