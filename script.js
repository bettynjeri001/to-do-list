// Get DOM elements
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Load tasks from local storage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Function to render tasks
function renderTasks() {
  todoList.innerHTML = ''; // Clear the list before rendering
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.classList.toggle('completed', todo.completed);
    
    const text = document.createElement('span');
    text.textContent = todo.text;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.onclick = () => deleteTask(index);
    
    const toggleButton = document.createElement('button');
    toggleButton.textContent = todo.completed ? 'Undo' : 'Complete';
    toggleButton.onclick = () => toggleComplete(index);

    li.appendChild(text);
    li.appendChild(toggleButton);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  });
}

// Function to add a task
function addTask() {
  const taskText = todoInput.value.trim();
  if (taskText) {
    todos.push({ text: taskText, completed: false });
    todoInput.value = '';
    saveTasks();
    renderTasks();
  }
}

// Function to delete a task
function deleteTask(index) {
  todos.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Function to mark a task as completed or not
function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  saveTasks();
  renderTasks();
}

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Event listeners
addButton.addEventListener('click', addTask);
todoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

// Render tasks on initial load
renderTasks();



