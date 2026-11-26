
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

// Add a new task
addButton.addEventListener("click", function () {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Create a new list item
    const li = document.createElement("li");

    const taskName = document.createElement("span");
    taskName.textContent = taskText;

    // Complete task by clicking its text
    taskName.addEventListener("click", function () {
        li.classList.toggle("completed");
    });

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
        li.remove();
    });

    li.appendChild(taskName);
    li.appendChild(deleteButton);

    taskList.appendChild(li);

    // Clear input
    taskInput.value = "";
});

// Add task when Enter is pressed
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addButton.click();
    }
});
