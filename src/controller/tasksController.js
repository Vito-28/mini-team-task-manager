import { createTaskFromTitle, getAllTasks, getTaskById, updateTaskByIdAndTitle, deleteTaskById, getAllTasksByUserId , getAllTasksByCompleted } from "../service/tasksService.js";

export const getTasks = async (req, res, next) => {

    try {
        const {userId} = req.params;
        const {completed} = req.query;
        
        if(userId !== undefined) {
            const tasks = await getAllTasksByUserId(userId);
            res.status(200).json(tasks);
        } else if(completed !== undefined) {
            const tasks = await getAllTasksByCompleted(completed);
            res.status(200).json(tasks);
        } else {
            const tasks = await getAllTasks();
            res.status(200).json(tasks);
        }
        
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