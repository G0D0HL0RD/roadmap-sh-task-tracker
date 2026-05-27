const {loadTasks,saveTasks,addTask, updateTask,deleteTask,listTasks,markTask} = require('./taskManager');

const args = process.argv.slice(2);

const command = args[0];

switch(command){
    case 'add':
        const desc = args[1];
        addTask(desc);
        break;
    case 'update':
        const id = args[1];
        const descUpdate = args[2];
        updateTask(id, descUpdate);
        break;
    case 'delete':
        const delId = args[1];
        deleteTask(delId);
        break;
    case 'list':
        const status = args[1];
        listTasks(status);
        break;
    case 'mark':
        const markId = args[1];
        const newStatus = args[2];
        markTask(markId, newStatus);
        break;
}
