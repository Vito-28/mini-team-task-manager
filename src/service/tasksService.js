import { NotFoundError } from "../error/NotFoundError.js";
import { UserNotFoundError } from "../error/UserNotFoundError.js";
import { findAllTasks, findTaskById, insertTask, editTask, removeTask, findAllTasksByUserId, findAllTasksByUserIdAndCompleted } from "../repository/tasksRepository.js";

export const getAllTasks = async () => {
    const tasks = await findAllTasks();
    return tasks;
};

export const getAllTasksByUserId = async (userId) => {
    const tasks = await findAllTasksByUserId(userId);
    return tasks;
};

export const getAllTasksByCompleted = async (userId, completed) => {
    const tasks = await findAllTasksByUserIdAndCompleted(userId, completed);
    return tasks;
};

export const getTaskById = async (id, userId) => {
    const task = await findTaskById(id, userId);

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

export const updateTaskByIdAndTitle = async (id, title, userId) => {

    const newTask = await editTask(id, title, userId);

    if (!newTask) {
        throw new NotFoundError();
    }


    return newTask;
};

export const deleteTaskById = async(id, userId) => {

    try {
        const task = await removeTask(id, userId);

        if(!task){
            throw new NotFoundError();
        }

        return task;
    } catch (error) {
        
        if(error.code === "23503" && error.constraint === "fk_tasks") {
            throw new TaskAssignedCategoriesError();
        }

        throw error;

    }

};