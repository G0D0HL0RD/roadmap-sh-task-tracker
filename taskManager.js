const fs = require("fs");

const file_path = './tasks.json';

function createTaskFile() {
    if (!fs.existsSync(file_path)) {
        fs.writeFileSync(file_path, JSON.stringify([], null, 2));
    }
}

function loadTasks() {
    createTaskFile();

    try {
        const data = fs.readFileSync(file_path, 'utf-8');

        if (!data.trim()) {
            return [];
        }

        return JSON.parse(data);
    } catch (err) {
        console.log("Error reading the task file.")
        return [];
    }
}

function saveTasks(tasks) {
    try {
        fs.writeFileSync(file_path, JSON.stringify(tasks, null, 2));
    } catch (err) {
        console.log("Error Saving tasks.");
    }
}
function addTask(description, status) {
    if (!description || description.trim() === "") {
        console.log("Task description cannot be empty");
        return;
    }

    const tasks = loadTasks();
    const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

    const now = new Date().toISOString();

    const newTask = {
        id: newId,
        description: description,
        status: "todo",
        createdAt: now,
        updatedAt: now,
    }
    tasks.push(newTask);
    saveTasks(tasks);

    console.log(`Task Added successfully (ID: ${newId})`);
}

const updateTask = (id, description) => {
    if (!id || isNaN(parseInt(id))) {
        console.log("No Task-id to update");
        return;
    }

    const tasks = loadTasks();
    const task = tasks.find((t) => t.id === parseInt(id));
    const desc = description ? description.trim() : null;
    const now = new Date().toISOString();

    if (task) {
        task.description = desc || task.description;
        task.updatedAt = now;
        saveTasks(tasks);
        console.log(`Task with ID ${id} is updated!!!`);
    } else {
        console.log("Task updating failed.")
    }

}
const deleteTask = (id) => {
    if (!id || isNaN(parseInt(id))) {
        console.log("No Task-id to delete");
        return;
    }

    const tasks = loadTasks();

    const taskExists = tasks.some((t) => t.id === parseInt(id));

    if (taskExists) {
        const tasksAfterDeletion = tasks.filter((t) => t.id !== parseInt(id));

        saveTasks(tasksAfterDeletion);
        console.log((`Task with ID ${id} deleted successfully.`))
    } else {
        console.log(`No such Task is present!!!`)
    }

}
const listTasks = (status) => {
    if (!status || !["todo", "in-progress", "done"].includes(status)) {
        console.log("Invalid status. Please use 'todo', 'in-progress', or 'done'.")
        return;
    }
    const tasks = loadTasks();
    const filteredTasks = tasks.filter((t) => t.status === status);

    if (filteredTasks.length === 0) {
        console.log(`No tasks with status '${status}' found.`);
    }
    else {
        console.log(`Tasks with status '${status}':`);
        filteredTasks.forEach((t) => {
            console.log(`ID: ${t.id}, Description: ${t.description}, Created At: ${t.createdAt}, Updated At: ${t.updatedAt}`);
            console.log("------------------------------------------------------------")
        })
    }
    return;
}

const markTask = (id, status) => {
    if (!id || isNaN(parseInt(id))) {
        console.log("No Task-id to update");
        return;
    }
    if (!status || !["todo", "in-progress", "done"].includes(status)) {
        console.log("Invalid status. Please use 'todo', 'in-progress', or 'done'.")
        return;
    }

    const tasks = loadTasks();
    const task = tasks.find((t) => t.id === parseInt(id));

    if (task) {
        task.status = status;
        task.updatedAt = new Date().toISOString();
        saveTasks(tasks);
        console.log(`Task with ID ${id} is marked as '${status}'!!!`);
    } else {
        console.log("No such task found!!!");
    }
}
module.exports = {
    loadTasks,
    saveTasks,
    addTask,
    updateTask,
    deleteTask,
    listTasks,
    markTask
}