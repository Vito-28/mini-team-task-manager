import { findAllTasks, findTaskById, insertTask } from "../repository/tasksRepository.js";

export const getAllTasks = async () => {
    const tasks = await findAllTasks();
    return tasks;
};

export const getTaskById = async (id) => {
    const task = await findTaskById(id);
    return task;
};

export const createTaskFromTitle = async (title) => {
    const tasks = await findAllTasks();

    const nextId = tasks.length === 0 ? 1 : Math.max(...tasks.map(t => t.id)) + 1;

    const newTask = {id: nextId, title: title, completed: false};

    await insertTask(newTask);

    return newTask;
};