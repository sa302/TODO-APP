document.addEventListener("DOMContentLoaded", function() {

    let inputTask = document.getElementById('task-input');
    let task_btn = document.getElementById('add-task-btn');
    let tasks = document.getElementById('task-list');

    // 🔹 Save tasks to localStorage
    function saveTasks() {
        const TaskArray = [];

        tasks.querySelectorAll('li').forEach(function(li) {
            TaskArray.push(li.firstChild.textContent);
        });

        localStorage.setItem("tasks", JSON.stringify(TaskArray));
    }

    // 🔹 Load tasks from localStorage
    function loadTasks() {
       const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

        savedTasks.forEach(function(taskText) {
            createTask(taskText);
        });
    }

    // 🔹 Create Task Function (VERY IMPORTANT)
    function createTask(text) {

        let li = document.createElement('li');
        li.innerText = text;

        let dltbtn = document.createElement('button');
        dltbtn.innerText = "Delete";

        dltbtn.addEventListener('click', function() {
            li.remove();
            saveTasks();
        });

        let edtbtn = document.createElement('button');
        edtbtn.innerText = "Edit";

        edtbtn.addEventListener('click', function() {
            let newTask = prompt("Edit your task:", li.firstChild?.textContent);

            if (newTask?.trim()) {
                li.firstChild.textContent = newTask.trim();
                saveTasks();
            }
        });

        li.appendChild(edtbtn);
        li.appendChild(dltbtn);
        tasks.appendChild(li);
    }

    // 🔹 Add Task
    task_btn.addEventListener('click', function() {

        let text = inputTask.value.trim();

        if (text === "") {
            alert("please enter the task");
            return;
        }

        createTask(text);
        saveTasks();
        inputTask.value = "";
    });

    // 🔹 Enter key
    inputTask.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            task_btn.click();
        }
    });

    // 🔹 Load saved tasks on page load
    loadTasks();

});