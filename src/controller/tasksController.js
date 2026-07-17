import { getAllTasks, getTaskById, createTaskFromTitle, updateTaskByIdAndTitle } from "../service/tasksService.js";

export const getTasks = async (req, res) => {
    const tasks = await getAllTasks();
    res.status(200).json(tasks);
};

export const getTask = async (req, res) => {
    const {id} = req.params;
    const task = await getTaskById(id);

    if(!task) {
        return res.status(404).send("Task not found");
    }

    res.status(200).json(task);
};

export const createTask = async (req, res) => {
    const {title} = req.body;
    
    const task = await createTaskFromTitle(title);
    res.status(201).json(task);
};

export const updateTask = async (req, res) => {
    const {id} = req.params;
    const {title} = req.body;

    const task = await updateTaskByIdAndTitle(id, title);

    if(!task){
        return res.status(404).send("Task not found");
    }

    res.status(200).json(task);
};