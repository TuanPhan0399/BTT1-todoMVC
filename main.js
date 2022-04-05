//Selectors
const taskInput = document.querySelector(".task-input input");
const taskBox = document.querySelector(".task-box");
const controls = document.querySelector(".controls");
const iTaskInput = document.querySelector(".task-input i");
let count = document.querySelector(".count");

//Edit task
let editId;
let isEditTask = false;

//Even listener
taskInput.addEventListener("keyup", saveTask);

// Nhận localStorage todo-list
let todos = JSON.parse(localStorage.getItem("todo-list"));

//Function
function showTodo() {
  let li = "";
  if (todos) {
    todos.forEach((todo, id) => {
        // Nếu todo status là completed, set isCompleted giá trị thành cheked
        let isCompleted = todo.status == "completed" ? "checked" : "";
        li += `<li class="task">
                 <div>
                   <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                   <p ondblclick="editTask(${id}, '${todo.name}')" class="${isCompleted}">${todo.name}</p>
                 </div>
                 <div class="task-close">
                   <i onclick="deleteTask(${id})" class="fa-solid fa-xmark"></i>
                 </div>
               </li>`
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
showTodo();

function deleteTask(deleteId) {
  // removing selected task
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  if (todos === []) {
    controls.style.display = "none";
  }
  showTodo();
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
  } else {
    taskName.classList.remove("checked");
    // updating the status of selected task to pending
    todos[selectedTask.id].status = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

function saveTask(event) {
  // Lấy kí tự trừ kí tự rỗng và cách
  let userTask = taskInput.value.trim();
  if (event.key === "Enter" && userTask) {
    if (!isEditTask){
      // Nếu todos không tồn tại, tạo một mảng rỗng cho todos
      if (!todos) {
        todos = [];
      }
      let taskInfo = {
        name: userTask,
        status: "pending",
      };
      //thêm một task mới vào todos
      todos.push(taskInfo);
    } else {
      isEditTask = false;
      todos[editId].name = userTask;
    }
    taskInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
  } 
}