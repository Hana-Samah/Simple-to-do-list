// TaskManager.js - Module to manage tasks
class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }

    addTask(task) {
        this.tasks.push(task);
        this.updateLocalStorage();
    }

    removeTask(index) {
        this.tasks.splice(index, 1);
        this.updateLocalStorage();
    }

    getTasks() {
        return this.tasks;
    }

    updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}

export default TaskManager;
