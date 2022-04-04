//Selectors
const taskInput = document.querySelector(".task-input input");
const taskBox = document.querySelector(".task-box");
const controls = document.querySelector(".controls");
const iTaskInput = document.querySelector(".task-input i");
let count = document.querySelector(".count");

//Even listener
taskInput.addEventListener("keyup", saveTask);

// Nhận localStorage todo-list
let todos = JSON.parse(localStorage.getItem("todo-list"));

//Function
function showTodo() {
  let li = "";
  if (todos) {
    todos.forEach((todo, id) => {
        li += `<li class="task">
                 <label for="${id}">
                   <input type="checkbox" id="${id}">
                   <p>${todo.name}</p>
                 </label>
                 <div class="task-close">
                   <i class="fa-solid fa-xmark"></i>
                 </div>
               </li>`
      });
  }
  taskBox.innerHTML = li;
  if (todos !== null) {
    controls.style.display = "flex";
    iTaskInput.style.display = "block";
  }
  if (todos !== null) {
    count.innerText = todos.length;
  } 
}
showTodo();

function saveTask(event) {
  // Lấy kí tự trừ kí tự rỗng và cách
  let userTask = taskInput.value.trim();
  if (event.key === "Enter" && userTask) {
    // Nếu todos không tồn tại, tạo một mảng rỗng cho todos
    if (!todos) {
      todos = [];
    }
    taskInput.value = "";
    let taskInfo = {
      name: userTask,
      status: "pending",
    };
    //thêm một task mới vào todos
    todos.push(taskInfo);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
  } 
}