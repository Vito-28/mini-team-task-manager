import { tasks } from "../data/tasks.js";

export const findAllTasks = async () => {
    return tasks;
};

export const findTaskById = async (id) => {
    const task = tasks.find(t => t.id === Number(id));
    return task;
};