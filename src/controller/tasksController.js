import { getAllTasks } from "../service/tasksService.js";

export const getTasks = async (req, res) => {
    const tasks = await getAllTasks();
    res.status(200).json(tasks);
};