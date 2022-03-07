const taskInput = document.querySelector(".userinput input");
const taskInputdate = document.querySelector(".userinputdetails .duedate");
const taskInputmodule = document.querySelector(".userinputdetails .subject");
const addbtn = document.querySelector(".userinput button");
const todolist = document.querySelector(".todo-list");
const clearall = document.querySelector(".clearall");
const filter = document.querySelectorAll(".filter span");

let todos = JSON.parse(localStorage.getItem("todo-list"))

let editid;
let isEditedTask = false;

filter.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
    })
})

taskInput.onkeyup = () => {
    let userTask = taskInput.value;
    if (userTask.trim() != 0) {
        addbtn.classList.add("active")
    } else {
        addbtn.classList.remove("active")
    }
}

taskInputdate.onkeyup = () => {
    let duedate = taskInputdate.value;
    if (duedate.trim() != 0) {
        addbtn.classList.add("active")
    } else {
        addbtn.classList.remove("active")
    }
}

taskInputmodule.onkeyup = () => {
    let module = taskInputmodule.value;
    if (module.trim() != 0) {
        addbtn.classList.add("active")
    } else {
        addbtn.classList.remove("active")
    }
}
showTask();

addbtn.onclick = () => {
    let userTask = taskInput.value.trim();
    let duedate = taskInputdate.value;
    let subject = taskInputmodule.value;
    if (!isEditedTask) {
        let taskInfo = { task: userTask, due: duedate, module: subject, status: "pending" }
        todos.push(taskInfo);
    }else{
        isEditedTask = false;
        todos[editid].task = userTask;
        todos[editid].due = duedate;
        todos[editid].module = subject;
    }

    taskInput.value = "";
    taskInputdate.value = "";
    taskInputmodule.value = "";
    document.getElementById("add").innerHTML = "Add";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTask();
}

function showTask() {
    let li = "";
    if (todos) {
        todos.forEach((listArr, id) => {
            let isCompleted = listArr.status == "completed" ? "checked" : "";
            li += `<li class="details">
                        <li class="todo">
                            <label for="${id}">
                                <input class="checkbox" onclick="doneStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                                <div class="${isCompleted}" id="taskstatus">
                                    <p>${listArr.task}</p>
                                    <p>${listArr.module}</p>
                                    <p>${listArr.due}</p>
                                </div>
                            </label>
                            <span class="settings">
                                <button onclick="editTask(${id}, '${listArr.task}', '${listArr.due}', '${listArr.module}')" class="edit">Edit</button>
                                <button onclick="deleteTask(${id})" class="delete">Delete</button>
                            </span>
                        </li>
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
    isEditedTask = false;
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTask()
});

function editTask(taskid, taskName, duedate, module) {
    editid = taskid;
    isEditedTask = true;
    taskInput.value = taskName;
    taskInputdate.value = duedate;
    taskInputmodule.value = module;
    document.getElementById("add").innerHTML = "Update";
    
}
