import { createTaskFromTitle, getAllTasks, getTaskById, updateTaskByIdAndTitle, deleteTaskById } from "../service/tasksService.js";

export const getTasks = async (req, res, next) => {

    try {
        const tasks = await getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }

};

export const getTask = async (req, res, next) => {

    try {
        const {id} = req.params;
        const task = await getTaskById(id);

        res.status(200).json(task);
    } catch (error) {
        next(error);
    }

};

export const createTask = async (req, res, next) => {

    try {
        const {title, userId} = req.body;
    
        const task = await createTaskFromTitle(title, userId);

        res.status(201).json(task);
    } catch (error) {
        next(error);
    }

};

export const updateTask = async (req, res, next) => {

    try {
        const {id} = req.params;
        const {title} = req.body;

        const task = await updateTaskByIdAndTitle(id, title);

        res.status(200).json(task);        
    } catch (error) {
        next(error);
    }


};

export const deleteTask = async (req, res, next) => {

    try {
        const {id} = req.params;
        await deleteTaskById(id);

        res.status(204).end();       
    } catch (error) {
        next(error);
    }

};