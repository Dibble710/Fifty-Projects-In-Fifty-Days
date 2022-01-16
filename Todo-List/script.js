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

    var touchtime = 0;
    $(todoEl).on("click", function () {
      if (touchtime == 0) {
        // set first click
        touchtime = new Date().getTime();
      } else {
        // compare first click to this click and see if they occurred within double click threshold
        if (new Date().getTime() - touchtime < 500) {
          // double click occurred
          todoEl.remove();
          updateLocalStorage();
          touchtime = 0;
        } else {
          // not a double click so set as a new first click
          touchtime = new Date().getTime();
        }
      }
    });

    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");
      updateLocalStorage()
    });
    // todoEl.addEventListener("dblclick", (e) => {
    //   e.preventDefault();
    //   todoEl.remove();
    //   updateLocalStorage()
    // });

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
