// Load công việc từ LocalStorage khi tải trang
document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToUI(task));
}

// Thêm công việc vào danh sách
function addTask() {
    let taskInput = document.getElementById("task");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Vui lòng nhập công việc!");
        return;
    }

    addTaskToUI(taskText);
    saveTask(taskText);
    taskInput.value = "";
}

// Hiển thị công việc trên giao diện
function addTaskToUI(taskText) {
    let li = document.createElement("li");

    // Ô nhập liệu cho chức năng sửa
    let taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    let input = document.createElement("input");
    input.type = "text";
    input.value = taskText;
    input.style.display = "none";

    let editButton = document.createElement("button");
    editButton.textContent = "Sửa";
    editButton.className = "edit";
    editButton.onclick = function () {
        if (input.style.display === "none") {
            input.style.display = "block";
            taskSpan.style.display = "none";
            editButton.textContent = "Lưu";
        } else {
            let updatedText = input.value.trim();
            if (updatedText !== "") {
                taskSpan.textContent = updatedText;
                updateTask(taskText, updatedText);
            }
            input.style.display = "none";
            taskSpan.style.display = "block";
            editButton.textContent = "Sửa";
        }
    };

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Xóa";
    deleteButton.className = "delete";
    deleteButton.onclick = function () {
        li.remove();
        deleteTask(taskText);
    };

    li.appendChild(taskSpan);
    li.appendChild(input);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    
    document.getElementById("task-list").appendChild(li);
}

// Lưu công việc vào LocalStorage
function saveTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Xóa công việc khỏi LocalStorage
function deleteTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Cập nhật công việc trong LocalStorage
function updateTask(oldText, newText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let index = tasks.indexOf(oldText);
    if (index !== -1) {
        tasks[index] = newText;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
