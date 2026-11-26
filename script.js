
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const themeButton = document.getElementById("themeButton");

let tasks = JSON.parse(localStorage.getItem("myTasks")) || [];

// Save tasks
function saveTasks() {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
}

// Update statistics
function updateTaskCounter() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = total - completed;

    emptyMessage.style.display = total === 0 ? "block" : "none";
}

// Display tasks
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {

        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        const taskName = document.createElement("span");
        taskName.className = "task-name";
        taskName.textContent = task.text;

        // Complete button
        const completeButton = document.createElement("button");
        completeButton.className = "task-button complete-btn";
        completeButton.textContent = task.completed ? "Undo" : "Complete";

        completeButton.addEventListener("click", function () {
            task.completed = !task.completed;
            saveTasks();
            displayTasks();
        });

        // Edit button
        const editButton = document.createElement("button");
        editButton.className = "task-button edit-btn";
        editButton.textContent = "Edit";

        editButton.addEventListener("click", function () {
            const newText = prompt("Edit your task:", task.text);

            if (newText !== null && newText.trim() !== "") {
                task.text = newText.trim();
                saveTasks();
                displayTasks();
            }
        });

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.className = "task-button delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            tasks = tasks.filter(item => item.id !== task.id);
            saveTasks();
            displayTasks();
        });

        li.appendChild(taskName);
        li.appendChild(completeButton);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    updateTaskCounter();
}

// Add new task
function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = {
        id: Date.now().toString() + Math.random().toString(16).slice(2),
        text: text,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    displayTasks();

    taskInput.value = "";
    taskInput.focus();
}

addButton.addEventListener("click", addTask);

// Add task using Enter key
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Dark and Light Mode
themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    themeButton.textContent = isDark ? "☀️" : "🌙";

    localStorage.setItem("darkMode", isDark);
});

// Load saved theme
const savedTheme = localStorage.getItem("darkMode");

if (savedTheme === "true") {
    document.body.classList.add("dark");
    themeButton.textContent = "☀️";
}

// Load saved tasks when website opens
displayTasks();
