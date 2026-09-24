import { createTaskFromTitle, getTaskById, updateTaskByIdAndTitle, deleteTaskById, getAllTasksByUserId , getAllTasksByCompleted } from "../service/tasksService.js";

export const getTasks = async (req, res, next) => {

    try {
        const userId = req.user.id;
        const {completed} = req.query;

        const tasks = completed === undefined ? 
                      await getAllTasksByUserId(userId) : 
                      await getAllTasksByCompleted(userId, completed);

        res.status(200).json(tasks);
        
    } catch (error) {
        next(error);
    }

};

export const getTask = async (req, res, next) => {

    try {
        const {taskId} = req.params;
        const userId = req.user.id;
        const task = await getTaskById(taskId, userId);

        res.status(200).json(task);
    } catch (error) {
        next(error);
    }

};

export const createTask = async (req, res, next) => {

    try {
        const {title} = req.body;
        const userId = req.user.id;
    
        const task = await createTaskFromTitle(title, userId);

        res.status(201).json(task);
    } catch (error) {
        next(error);
    }

};

export const updateTask = async (req, res, next) => {

    try {
        const {taskId} = req.params;
        const {title} = req.body;
        const userId = req.user.id;

        const task = await updateTaskByIdAndTitle(taskId, title, userId);

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