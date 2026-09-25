import { addCategoryToTheTask , addCategoriesToTheTask , getTasksCategoriesByTaskId , getTasksCategoriesByCategoryId , deleteTasksCategoriesById } from '../service/tasksCategoriesService.js'

export const addCategory = async (req, res, next) => {

    try {
        const {taskId, categoryId} = req.params;

        const userId = req.user.id;
    
        const relationCategoryTask = await addCategoryToTheTask(taskId, userId, categoryId);

        res.status(201).json(relationCategoryTask);
    } catch (error) {
        next(error);
    }

};

export const addCategories = async (req, res, next) => {

    try {
        const {taskId, listCategoriesId} = req.body;

        const userId = req.user.id;
    
        const relationsCategoryTask = await addCategoriesToTheTask(userId, taskId, listCategoriesId);

        res.status(201).json(relationsCategoryTask);
    } catch (error) {
        next(error);
    }

};

export const getTasksCategories = async (req, res, next) => {

    try {
        const {taskId} = req.params;

        const userId = req.user.id;

        const relationsCategoryTask = await getTasksCategoriesByTaskId(taskId, userId);

        res.status(200).json(relationsCategoryTask);
    } catch (error) {
        next(error);
    }

};

export const getCategoriesTasks = async (req, res, next) => {

    try {
        const {id} = req.params;

        const relationsCategoryTask = await getTasksCategoriesByCategoryId(id);

        res.status(200).json(relationsCategoryTask);
    } catch (error) {
        next(error);
    }

};

export const deleteTasksCategories = async (req, res, next) => {

    try {
        const {taskId, categoryId} = req.params;
        await deleteTasksCategoriesById(taskId, categoryId);

        res.status(204).end();       
    } catch (error) {
        next(error);
    }

};