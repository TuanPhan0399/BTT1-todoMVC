//Selectors
const taskInput = document.querySelector(".task-input input");
const taskBox = document.querySelector(".task-box");
const filters = document.querySelectorAll(".filters > span");
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
iTaskInput.addEventListener("click", takeAll);

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
  let todo;
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
                  <input ondblclick="editTask(this)" type="text" value="${todo.name}" class="${id} ${isCompleted}" readOnly>
                </div>
                <div class="task-close">
                  <i onclick="deleteTask(${id})" class="fa-solid fa-xmark"></i>
                </div>
              </li>`;
      }
      if (todo.status === "completed") {
        clearAll.style.opacity = '1';
      }
    });
  }
  todo = todos.filter(todo => todo.status === "completed");
  if (todo.length === todos.length) {
    iTaskInput.classList.add('tick-all');
  } else {
    iTaskInput.classList.remove('tick-all');
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
  if (todos.length === 0) {
    controls.style.display = "none";
    iTaskInput.style.display = "none";
  }
  showTodo(idFilter);
}

// data editing function
function editTask(input) {
  const taskClose = input.parentElement.parentElement.lastElementChild;
  const inputCheck = input.parentElement.firstElementChild;
  const id = input.classList[0];
  taskClose.style.opacity = '0';
  inputCheck.style.opacity = '0';
  input.style.border = "1px solid #999";
  input.readOnly = false;
  input.setSelectionRange(input.value.length, input.value.length);
  if (input.classList.contains('checked')) {
    input.classList.remove('checked');
    input.addEventListener('keyup', function (event) {
      if (event.keyCode === 13 && input.value.trim()) {
        event.preventDefault();
        // fix bug edit input and task close;
        taskClose.style.opacity = '1';
        inputCheck.style.opacity = '1';
        todos[input.classList[0]].name = input.value.trim();
        input.classList.add('checked');
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(idFilter);
      } else if (event.keyCode === 13 && input.value === "") {
        todos.splice(id, 1);
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(idFilter);
      }
    });
    // add onblur
    input.addEventListener('blur', (event) => {
      if (input.value.trim()) {
        event.preventDefault();
        // fix bug edit input and task close;
        taskClose.style.opacity = '1';
        inputCheck.style.opacity = '1';
        todos[input.classList[0]].name = input.value.trim();
        input.classList.add('checked');
      } else {
        todos.splice(id, 1);
      }
      localStorage.setItem("todo-list", JSON.stringify(todos));
      showTodo(idFilter);
    })
  } else {
    input.addEventListener('keyup', function (event) {
      if (event.keyCode === 13 && input.value.trim()) {
        event.preventDefault();
        // fix bug edit input and task close;
        taskClose.style.opacity = '1';
        inputCheck.style.opacity = '1';
        todos[input.classList[0]].name = input.value.trim();
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(idFilter);
      } else if (event.keyCode === 13 && input.value === "") {
        todos.splice(id, 1);
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(idFilter);
      }
    });
    // add onblur
    input.addEventListener('blur', (event) => {
      if (input.value.trim()) {
        event.preventDefault();
        // fix bug edit input and task close;
        taskClose.style.opacity = '1';
        inputCheck.style.opacity = '1';
        todos[input.classList[0]].name = input.value.trim();
      } else {
        todos.splice(id, 1);
      }
      localStorage.setItem("todo-list", JSON.stringify(todos));
      showTodo(idFilter);
    })
  }
}

// Select all input
function takeAll () {
  if (iTaskInput.classList.contains('tick-all') == false) {
    clearAll.style.opacity = '1';
    iTaskInput.classList.add('tick-all');
    todos.forEach( todo => {
      todo.status = "completed";
    })
  } else {
    clearAll.style.opacity = '0';
    iTaskInput.classList.remove('tick-all');
    todos.forEach( todo => {
      todo.status = "pending";
    })
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo(idFilter);
}

function updateStatus(selectedTask) {
  let liTask = selectedTask.parentElement.parentElement;
  let taskName = selectedTask.parentElement.lastElementChild;
  const filterStatus = Array.from(filters);
  let filterActive = filterStatus.filter(e => e.classList[0] === 'active');
  let todo;
  let todoPending;
  if (selectedTask.checked) {
    clearAll.style.opacity = '1';
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
  // Bug tick all
  todo = todos.filter( todo => todo.status === "completed");
  if (todo.length === todos.length) {
    iTaskInput.classList.add('tick-all');
  } else {
    iTaskInput.classList.remove('tick-all');
  }
  // fix clear all
  todoPending = todos.filter(todoPending => todoPending.status === "pending");
  if (todoPending.length === todos.length) {
    clearAll.style.opacity = '0';
  }
  // fix bug active
  if (filterActive[0].id === "completed" && selectedTask.checked === false){
    liTask.style.display = "none";
  } else if (filterActive[0].id === 'pending' && selectedTask.checked) {
    liTask.style.display = "none";
  } else if (filterActive[0].id === 'all') {
    liTask.style.display = "flex";
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
    iTaskInput.classList.remove('tick-all');
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
  if (todos.length === 0) {
    iTaskInput.style.display = "none";
    controls.style.display = "none";
  }
  clearAll.style.opacity = '0';
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo(idFilter);
}
