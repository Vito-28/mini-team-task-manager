import { NotFoundError } from "../error/NotFoundError.js";
import { UserNotFoundError } from "../error/UserNotFoundError.js";
import { findAllTasks, findTaskById, insertTask, editTask, removeTask, findAllTasksByUserId, findAllTasksByCompleted } from "../repository/tasksRepository.js";

export const getAllTasks = async () => {
    const tasks = await findAllTasks();
    return tasks;
};

export const getAllTasksByUserId = async (userId) => {
    const tasks = await findAllTasksByUserId(userId);
    return tasks;
};

export const getAllTasksByCompleted = async (completed) => {
    const tasks = await findAllTasksByCompleted(completed);
    return tasks;
};

export const getTaskById = async (id) => {
    const task = await findTaskById(id);

    if(!task) {
        throw new NotFoundError();
    }

    return task;
};

export const createTaskFromTitle = async (title, userId) => {
    try {
        return await insertTask(title, userId);
    } catch (error) {

        if (error.code === "23503") {
            throw new UserNotFoundError();
        }

        throw error;
    }
};

export const updateTaskByIdAndTitle = async (id, title) => {
    const newTask = await editTask(id, title);

    if (!newTask) {
        throw new NotFoundError();
    }


    return newTask;
};

export const deleteTaskById = async(id) => {
    const task = await removeTask(id);

    if(!task){
        throw new NotFoundError();
    }

    return task;
};