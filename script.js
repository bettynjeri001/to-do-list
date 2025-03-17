// DOM Elements
let taskForm = document.getElementById('taskForm');
let taskList = document.getElementById('taskList');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Current filter state
let currentFilter = 'all';

// Render tasks based on filter
function renderTasks() {
    taskList.innerHTML = '';
    let filteredTasks = tasks.filter(task => {
        if (currentFilter === 'completed') return task.completed;
        if (currentFilter === 'pending') return !task.completed;
        return true; // 'all'
    });

    filteredTasks.forEach((task, index) => {
        let taskItem = document.createElement('li');
        taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskItem.innerHTML = `
            <div class="task-info">
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p class="due-date">Due: ${task.dueDate}</p>
            </div>
            <div class="task-actions">
                <button class="complete" onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button class="edit" onclick="editTask(${index})">Edit</button>
                <button class="delete" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

// Add Task
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let title = document.getElementById('taskTitle').value;
    let description = document.getElementById('taskDescription').value;
    let dueDate = document.getElementById('taskDueDate').value;

    if (title && dueDate) {
        tasks.push({ title, description, dueDate, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        taskForm.reset();
    }
});

// Toggle Complete
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Edit Task
function editTask(index) {;
    let  task = tasks[index];
    let newTitle = prompt('Edit Task Title:', task.title);
    let newDescription = prompt('Edit Task Description:', task.description);
    let newDueDate = prompt('Edit Due Date (YYYY-MM-DD):', task.dueDate);

    if (newTitle && newDueDate) {
        tasks[index] = {
            title: newTitle,
            description: newDescription,
            dueDate: newDueDate,
            completed: task.completed
        };
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

// Delete Task
function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

// Filter Tasks
function filterTasks(filter) {
    currentFilter = filter;
    renderTasks();
}

// Initial render
renderTasks();