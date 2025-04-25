document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const filterAll = document.getElementById('filterAll');
    const filterCompleted = document.getElementById('filterCompleted');
    const filterPending = document.getElementById('filterPending');
    
    // Task data
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentFilter = 'all';

    // Render function
    function renderTasks() {
        taskList.innerHTML = '';
        
        const filteredTasks = tasks.filter(task => {
            if (currentFilter === 'completed') return task.completed;
            if (currentFilter === 'pending') return !task.completed;
            return true; // 'all'
        });

        if (filteredTasks.length === 0) {
            taskList.innerHTML = '<p class="no-tasks">No tasks found</p>';
            return;
        }

        filteredTasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskItem.innerHTML = `
                <div class="task-info">
                    <h3>${task.title}</h3>
                    <p>${task.description || 'No description'}</p>
                    <p class="due-date">Due: ${task.dueDate || 'No due date'}</p>
                </div>
                <div class="task-actions">
                    <button class="complete" data-index="${index}">
                        ${task.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });

        // Add event listeners to all buttons
        document.querySelectorAll('.complete').forEach(btn => {
            btn.addEventListener('click', () => toggleComplete(parseInt(btn.dataset.index)));
        });
        
        document.querySelectorAll('.edit').forEach(btn => {
            btn.addEventListener('click', () => editTask(parseInt(btn.dataset.index)));
        });
        
        document.querySelectorAll('.delete').forEach(btn => {
            btn.addEventListener('click', () => deleteTask(parseInt(btn.dataset.index)));
        });
    }

    // Task functions
    function toggleComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        saveAndRender();
    }

    function editTask(index) {
        const task = tasks[index];
        const newTitle = prompt('Edit task title:', task.title);
        if (newTitle === null) return; // User cancelled
        
        const newDescription = prompt('Edit task description:', task.description || '');
        const newDueDate = prompt('Edit due date (YYYY-MM-DD):', task.dueDate || '');

        if (newTitle) {
            tasks[index] = {
                title: newTitle,
                description: newDescription,
                dueDate: newDueDate,
                completed: task.completed
            };
            saveAndRender();
        }
    }

    function deleteTask(index) {
        if (confirm('Are you sure you want to delete this task?')) {
            tasks.splice(index, 1);
            saveAndRender();
        }
    }

    function saveAndRender() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    // Filter functions
    function setFilter(filter) {
        currentFilter = filter;
        renderTasks();
        
        // Update active filter UI
        filterAll.classList.toggle('active', filter === 'all');
        filterCompleted.classList.toggle('active', filter === 'completed');
        filterPending.classList.toggle('active', filter === 'pending');
    }

    // Event listeners
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('taskTitle').value.trim();
        const description = document.getElementById('taskDescription').value.trim();
        const dueDate = document.getElementById('taskDueDate').value;

        if (title) {
            tasks.push({
                title,
                description: description || undefined,
                dueDate: dueDate || undefined,
                completed: false
            });
            saveAndRender();
            taskForm.reset();
        } else {
            alert('Task title is required!');
        }
    });

    filterAll.addEventListener('click', () => setFilter('all'));
    filterCompleted.addEventListener('click', () => setFilter('completed'));
    filterPending.addEventListener('click', () => setFilter('pending'));

    // Initial render
    renderTasks();
});