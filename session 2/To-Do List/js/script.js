const taskInput = document.querySelector(".userinput input");
const taskInputdate = document.querySelector(".userinputdetails .duedate");
const taskInputmodule = document.querySelector(".userinputdetails .subject");
const addbtn = document.querySelector(".userinput button");
const todolist = document.querySelector(".todo-list");
const clearall = document.querySelector(".clearall");
const filter = document.querySelectorAll(".filter span");
const sortdefault = document.querySelector("#sortdefault");
const sortname = document.querySelector("#sortname");
const sortdue = document.querySelector("#sortdue");
const sortmodules = document.querySelector("#sortmodules");

let todos = JSON.parse(localStorage.getItem("todo-list"));

let editid;
let isEditedTask = false;

let desc = false;

filter.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
    })
})

sortname.addEventListener("click", () => {
    let array = sort_by_name(todos, 'task', desc);
    showTask(array);
    desc = !desc;
    console.log(array);
})

function sort_by_name(array, sort, desc){
    array.sort(function(a,b){
        if (a[sort]<b[sort]) return -1;
        if (a[sort]>b[sort]) return 1;
        return 0;
    })

    if (desc) array.reverse();
    return array
}

sortdue.addEventListener("click", () => {
    let array = sort_by_due(todos, 'due', desc);
    showTask(array);
    desc = !desc;
    console.log(array);
})

function sort_by_due(array, sort, desc){
    array.sort(function(a,b){
        if (a[sort]<b[sort]) return -1;
        if (a[sort]>b[sort]) return 1;
        return 0;
    })

    if (desc) array.reverse();
    return array
}

sortmodules.addEventListener("click", () => {
    let array = sort_by_module(todos, 'module', desc);
    showTask(array);
    desc = !desc;
    console.log(array);
})

function sort_by_module(array, sort, desc){
    array.sort(function(a,b){
        if (a[sort]<b[sort]) return -1;
        if (a[sort]>b[sort]) return 1;
        return 0;
    })

    if (desc) array.reverse();
    return array
}

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
        todos = !todos ? [] : todos;
        let taskInfo = { task: userTask, due: duedate, module: subject, status: "pending" }
        todos.push(taskInfo);
    } else {
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
            li += `<li class="todo">
                        <label for="${id}">
                            <input class="checkbox" onclick="doneStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                            <div class="${isCompleted}" id="taskstatus">
                                <p class="task">${listArr.task}</p>
                                <p class="module">${listArr.module}</p>
                                <p class="due"><h4><span class="badge badge-info">${listArr.due}</span></h4></p>
                            </div>
                        </label>
                        <span class="settings">
                            <button onclick="editTask(${id}, '${listArr.task}', '${listArr.due}', '${listArr.module}')" class="edit">Edit</button>
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

function searchtask() {
    const input = document.getElementById("filtertask").value.toUpperCase();
    const searchtask = document.getElementById("todo-list");
    console.log(searchtask);

    const search = searchtask.getElementsByClassName("todo")
    console.log(search);

    for (let i = 0; i < search.length; i++) {
        let task = search[i].querySelector("#taskstatus p.task");
        console.log(task);

        if (task.innerText.toUpperCase().indexOf(input) > -1) {
            search[i].style.display = "";
        } else {
            search[i].style.display = "none";
        }
    }
}

function searchmodule() {
    const input = document.getElementById("filtermodule").value.toUpperCase();
    const searchmodule = document.getElementById("todo-list");
    console.log(searchmodule);

    const search = searchmodule.getElementsByClassName("todo")
    console.log(search);

    for (let i = 0; i < search.length; i++) {
        let module = search[i].querySelector("#taskstatus p.module");
        console.log(module);

        if (module.innerText.toUpperCase().indexOf(input) > -1) {
            search[i].style.display = "";
        } else {
            search[i].style.display = "none";
        }
    }
}