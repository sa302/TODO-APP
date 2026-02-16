document.addEventListener("DOMContentLoaded", function() {

    // 1️⃣ Grab HTML elements
    let inputTask = document.getElementById('task-input');
    let task_btn = document.getElementById('add-task-btn');
    let tasks = document.getElementById('task-list');
    let filterAllBtn = document.getElementById('filter-all');
    let filterCompletedBtn = document.getElementById('filter-completed');
    let filterPendingBtn = document.getElementById('filter-pending');

    // 2️⃣ Save tasks to localStorage
    function saveTasks() {
        const TaskArray = [];

        tasks.querySelectorAll('li').forEach(function(li) {
            const checkbox = li.querySelector('input[type="checkbox"]');
            const text = li.querySelector('span').textContent;
            TaskArray.push({ text: text, completed: checkbox.checked });
        });

        localStorage.setItem("tasks", JSON.stringify(TaskArray));
    }

    // 3️⃣ Load tasks from localStorage
    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(function(task) {
            createTask(task); // pass object {text, completed}
        });
    }

    // 4️⃣ Create task
    function createTask(task) {
        let li = document.createElement('li');

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed || false;

        let textSpan = document.createElement('span');
        textSpan.textContent = task.text || task;

        if (checkbox.checked) textSpan.style.textDecoration = "line-through";

        checkbox.addEventListener('change', function() {
            textSpan.style.textDecoration = this.checked ? "line-through" : "none";
            saveTasks();
        });

        let edtbtn = document.createElement('button');
        edtbtn.innerText = "Edit";
        edtbtn.addEventListener('click', function() {
            let newTask = prompt("Edit your task:", textSpan.textContent);
            if (newTask?.trim()) {
                textSpan.textContent = newTask.trim();
                saveTasks();
            }
        });

        let dltbtn = document.createElement('button');
        dltbtn.innerText = "Delete";
        dltbtn.addEventListener('click', function() {
            li.remove();
            saveTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(edtbtn);
        li.appendChild(dltbtn);

        tasks.appendChild(li);
    }

    // 5️⃣ Add new task
    task_btn.addEventListener('click', function() {
        let text = inputTask.value.trim();
        if (!text) { alert("Please enter the task"); return; }
        createTask({ text: text, completed: false });
        saveTasks();
        inputTask.value = "";
    });

    inputTask.addEventListener('keydown', function(event) {
        if (event.key === "Enter") task_btn.click();
    });

    // 6️⃣ Filter tasks
    function applyFilter(filter) {  // ✅ fixed function name
        tasks.querySelectorAll('li').forEach(li => {
            const checkbox = li.querySelector('input[type="checkbox"]');
            if (filter === "all") {
                li.style.display = "";
            } else if (filter === "completed" && checkbox.checked) {
                li.style.display = "";
            } else if (filter === "pending" && !checkbox.checked) {
                li.style.display = "";
            } else {
                li.style.display = "none";
            }
        });
    }

    filterAllBtn.addEventListener('click', () => applyFilter('all'));
    filterCompletedBtn.addEventListener('click', () => applyFilter('completed'));
    filterPendingBtn.addEventListener('click', () => applyFilter('pending'));

    // 7️⃣ Load tasks on page load
    loadTasks();

});