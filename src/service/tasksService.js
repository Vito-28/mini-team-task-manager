import { findAllTasks, findTaskById } from "../repository/tasksRepository.js";

export const getAllTasks = async () => {
    const tasks = await findAllTasks();
    return tasks;
};

export const getTaskById = async (id) => {
    const task = await findTaskById(id);
    return task;
};