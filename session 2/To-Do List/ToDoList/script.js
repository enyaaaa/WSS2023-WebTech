const taskInput = document.querySelector(".userinput input");
const addbtn = document.querySelector(".userinput button");
const todolist = document.querySelector(".todo-list");
const clearall = document.querySelector(".clearall");

let todos = JSON.parse(localStorage.getItem("todo-list"))

let editid;
let isEditedTask = false;

taskInput.onkeyup = () => {
    let userTask = taskInput.value;
    if (userTask.trim() != 0) {
        addbtn.classList.add("active")
    } else {
        addbtn.classList.remove("active")
    }
}
showTask();

addbtn.onclick = () => {
    let userTask = taskInput.value.trim();
    if (!isEditedTask) {
        let taskInfo = { task: userTask, status: "pending" }
        todos.push(taskInfo);
    }else{
        isEditedTask = false;
        todos[editid].task = userTask;
    }

    taskInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTask();
}

function showTask() {
    let li = "";
    if (todos) {
        todos.forEach((listArr, id) => {
            let isCompleted = listArr.status == "completed" ? "checked" : "";
            li += `<li class="todo">
                        <label for="${id}">
                            <input onclick="doneStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                            <p class="${isCompleted}">${listArr.task}</p>
                            
                        </label>
                        <span class="settings">
                            <button onclick="editTask(${id}, '${listArr.task}')" class="edit">Edit</button>
                            <button onclick="deleteTask(${id})" class="delete">Delete</button>
                        </span>
                    </li>`;
        });
    }

    todolist.innerHTML = li || `<span>You don't have any task here</span>`;;
}

function doneStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}

function deleteTask(deleteid) {
    todos.splice(deleteid, 1)
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTask()
}

clearall.addEventListener("click", () => {
    isEditTask = false;
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTask()
});

function editTask(taskid, taskName) {
    editid = taskid;
    isEditedTask = true;
    taskInput.value = taskName;
}
