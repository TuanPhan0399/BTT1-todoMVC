//Selectors
const taskInput = document.querySelector(".task-input input");
const taskBox = document.querySelector(".task-box");
const filters = document.querySelectorAll(".filters > span");
const spanFilter = document.querySelector(".filters > span");
const controls = document.querySelector(".controls");
const iTaskInput = document.querySelector(".task-input i");
const clearAll = document.querySelector(".clear-btn");
let count = document.querySelector(".count");

// Variable
let countIndex;
let idFilter = "all";

//Even listener
taskInput.addEventListener("keyup", saveTask);
clearAll.addEventListener("click", clearAllCompleted);

// Get localStorage todo-list
let todos = JSON.parse(localStorage.getItem("todo-list"));

// Work with filters
filters.forEach( (btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTodo(btn.id);
    return idFilter = btn.id;
  });
});

//Function
function showTodo(filter) {
  let li = "";
  countIndex = todos.length;
  if (todos) {
    todos.forEach((todo, id) => {
      // handle count
      if (todo.status == "completed") {
        countIndex -= 1;
      }
      // if todo status is completed, set isCompleted value to checked
      let isCompleted = todo.status == "completed" ? "checked" : "";
      if (filter === todo.status || filter === "all") {
        li += `<li class="task">
                <div>
                  <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                  <span ondblclick="editTask(this)" class="${id} ${isCompleted}">${todo.name}</span>
                </div>
                <div class="task-close">
                  <i onclick="deleteTask(${id})" class="fa-solid fa-xmark"></i>
                </div>
              </li>`;
      }
    });
  }
  taskBox.innerHTML = li;
  if (todos.length !== 0) {
    controls.style.display = "flex";
    iTaskInput.style.display = "block";
    count.innerText = countIndex;
  } else {
    controls.style.display = "none";
  }
}
showTodo(idFilter);

function deleteTask(deleteId) {
  // removing selected task
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  if (todos === 0) {
    controls.style.display = "none";
    iTaskInput.style.display = "none";
  }
  showTodo(idFilter);
}

// data editing function
function editTask(span) {
  let valueInput = span.innerText;
  span.innerText = "";
  span.innerHTML += `<input onclick="editSpan(this)" type="text" value="${valueInput}"></input>`;
}

// new data editting add with local
function editSpan(input) {
  let span = input.parentElement;
  input.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      span.innerText = input.value.trim();
      input.style.display = "none";
      todos[span.classList[0]].name = span.innerText;
      localStorage.setItem("todo-list", JSON.stringify(todos));
    }
  });
}

function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    // updating the status of selected task to completed
    todos[selectedTask.id].status = "completed";
    countIndex -= 1;
  } else {
    taskName.classList.remove("checked");
    // updating the status of selected task to pending
    todos[selectedTask.id].status = "pending";
    countIndex += 1;
  }
  count.innerText = countIndex;
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

function saveTask(event) {
  // Do not take spaces and null characters
  let userTask = taskInput.value.trim();
  if (event.key === "Enter" && userTask) {
    // if todos don't exits, create empty array to todos
    if (!todos) {
      todos = [];
    }
    let taskInfo = {
      name: userTask,
      status: "pending",
    };
    //Add one task new on todos
    todos.push(taskInfo);
    taskInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(idFilter);
  } 
}

function clearAllCompleted () {
  // removing selected task
  const todos2 = todos.filter( todo => (todo.status !== 'completed'));
  todos = todos2;
  localStorage.setItem("todo-list", JSON.stringify(todos));
  if (todos.length === 0) {
    controls.style.display = "none";
  }
  showTodo(idFilter);
}