import { tasks } from "../data/tasks.js";

export const findAllTasks = async () => {
    return tasks;
};

export const findTaskById = async (id) => {
    const task = tasks.find(t => t.id === Number(id));
    return task;
};

export const insertTask = async (task) => {
    tasks.push(task);
};

export const editTask = async (task, title) => {
    task.title = title;
    return task;
};

export const removeTask = async (task) => {
    tasks.splice(tasks.indexOf(task),1);
}