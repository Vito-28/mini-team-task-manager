import { NotFoundError } from "../error/NotFoundError.js";
import { findAllTasks, findTaskById, insertTask, editTask, removeTask } from "../repository/tasksRepository.js";

export const getAllTasks = async () => {
    const tasks = await findAllTasks();
    return tasks;
};

export const getTaskById = async (id) => {
    const task = await findTaskById(id);

    if(!task) {
        throw new NotFoundError();
    }

    return task;
};

export const createTaskFromTitle = async (title) => {
    const tasks = await findAllTasks();

    const nextId = tasks.length === 0 ? 1 : Math.max(...tasks.map(t => t.id)) + 1;

    const newTask = {id: nextId, title: title, completed: false};

    await insertTask(newTask);

    return newTask;
};

export const updateTaskByIdAndTitle = async (id, title) => {
    const task = await findTaskById(id);

    if(!task){
        throw new NotFoundError();
    }

    const newTask = await editTask(task, title);

    return newTask;
};

export const deleteTaskById = async(id) => {
    const task = await findTaskById(id);

    if(!task){
        throw new NotFoundError();
    }

    await removeTask(task);

    return task;
};