document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addBtn = document.getElementById("add-btn");
    const taskBox = document.getElementById("task-box");
    const clearBtn = document.getElementById("clear-btn");

    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    function saveTodos() {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function renderTodos() {
        taskBox.innerHTML = "";
        if (todos.length === 0) {
            taskBox.innerHTML = "<span>Task Not Added</span>";
        } else {
            todos.forEach((todo, index) => {
                const li = document.createElement("li");
                li.classList.add("task");

                li.innerHTML = `
                    <label>
                        <p class="${todo.status === "completed" ? "checked" : ""}">${todo.name}</p>
                    </label>
                    <div class="task-actions">
                        <button data-index="${index}" class="complete-btn">Done</button>
                        <button data-index="${index}" class="delete-btn">Remove</button>
                    </div>
                `;
                taskBox.appendChild(li);
            });
        }
    }

    addBtn.addEventListener("click", () => {
        const taskName = taskInput.value.trim();
        if (taskName) {
            const taskExists = todos.some(todo => todo.name.toLowerCase() === taskName.toLowerCase());
            if (!taskExists) {
                todos.push({ name: taskName, status: "pending" });
                taskInput.value = "";
                saveTodos();
                renderTodos();
            } else {
                alert("Task already exists!");
            }
        }
    });

    taskBox.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        if (e.target.classList.contains("complete-btn")) {
            todos[index].status = todos[index].status === "pending" ? "completed" : "pending";
        }
        if (e.target.classList.contains("delete-btn")) {
            todos.splice(index, 1);
        }
        saveTodos();
        renderTodos();
    });

    clearBtn.addEventListener("click", () => {
        todos = [];
        saveTodos();
        renderTodos();
    });

    renderTodos();
});
