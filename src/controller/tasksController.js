import { getAllTasks, getTaskById, createTaskFromTitle, updateTaskByIdAndTitle, deleteTaskById } from "../service/tasksService.js";

export const getTasks = async (req, res) => {

    try {
        const tasks = await getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
    
};

export const getTask = async (req, res) => {

    try {
        const {id} = req.params;
        const task = await getTaskById(id);

        if(!task) {
            return res.status(404).send("Task not found");
        }

        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");        
    }

};

export const createTask = async (req, res) => {

    try {
        const {title} = req.body;
        
        const task = await createTaskFromTitle(title);
        res.status(201).json(task);        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");         
    }

};

export const updateTask = async (req, res) => {

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
        res.status(500).send("Internal Server Error");         
    }
    
};

export const deleteTask = async (req, res) => {

    try {
        const {id} = req.params;
        const task = await deleteTaskById(id);

        if(!task){
            return res.status(404).send("Task not found");
        }

        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");        
    }

};