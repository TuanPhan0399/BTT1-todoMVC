//Selectors
const taskInput = document.querySelector(".task-input input");
const taskBox = document.querySelector(".task-box");
const filters = document.querySelectorAll(".filters > span");
const spanFilter = document.querySelector(".filters > span");
const controls = document.querySelector(".controls");
const iTaskInput = document.querySelector(".task-input i");
let count = document.querySelector(".count");

//Edit task
let editId;
let isEditTask = false;
let idFilter = "all";

//Even listener
taskInput.addEventListener("keyup", saveTask);

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
  if (todos) {
    todos.forEach((todo, id) => {
        // if todo status is completed, set isCompleted value to checked
        let isCompleted = todo.status == "completed" ? "checked" : "";
        if(filter === todo.status || filter === "all"){
          li += `<li class="task">
                  <div>
                    <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                    <p ondblclick="editTask(${id}, '${todo.name}')" class="${isCompleted}">${todo.name}</p>
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
    count.innerText = todos.length;
  } else {
    controls.style.display = "none";
  }
}
showTodo(idFilter);

function deleteTask(deleteId) {
  // removing selected task
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  if (todos === []) {
    controls.style.display = "none";
  }
  showTodo(idFilter);
}

function editTask(taskId, taskName) {
  editId = taskId;
  isEditTask = true;
  taskInput.value = taskName;
}

function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    // updating the status of selected task to completed
    todos[selectedTask.id].status = "completed";
    countIndex --;
  } else {
    taskName.classList.remove("checked");
    // updating the status of selected task to pending
    todos[selectedTask.id].status = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

function saveTask(event) {
  // Do not take spaces and null characters
  let userTask = taskInput.value.trim();
  if (event.key === "Enter" && userTask) {
    if (!isEditTask){
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
    } else {
      isEditTask = false;
      todos[editId].name = userTask;
    }
    taskInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(idFilter);
  } 
}