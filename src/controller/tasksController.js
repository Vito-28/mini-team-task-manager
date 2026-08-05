import { getAllTasks, getTaskById, createTaskFromTitle, updateTaskByIdAndTitle, deleteTaskById } from "../service/tasksService.js";

export const getTasks = async (req, res, next) => {

    try {
        const tasks = await getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        next(err);
    }
    
};

export const getTask = async (req, res, next) => {

    try {
        const {id} = req.params;
        const task = await getTaskById(id);

        if(!task) {
            return res.status(404).send("Task not found");
        }

        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        next(err);       
    }

};

export const createTask = async (req, res, next) => {

    try {
        const {title} = req.body;
        
        const task = await createTaskFromTitle(title);
        res.status(201).json(task);        
    } catch (error) {
        console.error(error);
        next(err);        
    }

};

export const updateTask = async (req, res, next) => {

    try {
        const {id} = req.params;
        const {title} = req.body;

        const task = await updateTaskByIdAndTitle(id, title);

        if(!task){
            return res.status(404).send("Task not found");
        }

        res.status(200).json(task);        
    } catch (error) {
        console.error(error);
        next(err);        
    }
    
};

export const deleteTask = async (req, res, next) => {

    try {
        const {id} = req.params;
        const task = await deleteTaskById(id);

        if(!task){
            return res.status(404).send("Task not found");
        }

        res.status(204).end();
    } catch (error) {
        console.error(error);
        next(err);      
    }

};