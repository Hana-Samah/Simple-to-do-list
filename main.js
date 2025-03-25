// main.js - Enhanced Interactivity
import TaskManager from './TaskManager.js';

const taskInput = document.getElementById('taskInput');
const dateTimeInput = document.getElementById('dateTimeInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

const taskManager = new TaskManager();

// Animation when adding or removing tasks
function addAnimation(li) {
    li.classList.add('task-item-animate');
    setTimeout(() => li.classList.remove('task-item-animate'), 300);
}

// Render tasks with dynamic states
function renderTasks() {
    taskList.innerHTML = '';
    taskManager.getTasks().forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="task-text">${item.task}</span> <span class="date-time">${item.dateTime}</span>`;
        li.classList.add('task-item');

        if (item.completed) {
            li.classList.add('completed');
        }
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✖';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => {
            taskManager.removeTask(index);
            renderTasks();
        };

        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = item.completed ? '✔' : '❌';
        toggleBtn.classList.add('toggle-btn');
        toggleBtn.onclick = () => {
            item.completed = !item.completed;
            renderTasks();
        };

        li.appendChild(deleteBtn);
        li.appendChild(toggleBtn);
        taskList.appendChild(li);

        // Add animation
        addAnimation(li);
    });
}

addTaskBtn.addEventListener('click', () => {
    const task = taskInput.value.trim();
    const dateTime = dateTimeInput.value;
    if (task && dateTime) {
        taskManager.addTask({ task, dateTime, completed: false });
        taskInput.value = '';
        dateTimeInput.value = '';
        renderTasks();
    }
});

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTaskBtn.click();
    }
});

renderTasks();

// Update task styling dynamically
document.getElementById('taskList').addEventListener('mouseover', (event) => {
    if (event.target.classList.contains('task-item')) {
        event.target.style.transform = 'scale(1.05)';
    }
});

document.getElementById('taskList').addEventListener('mouseout', (event) => {
    if (event.target.classList.contains('task-item')) {
        event.target.style.transform = 'scale(1)';
    }
});
