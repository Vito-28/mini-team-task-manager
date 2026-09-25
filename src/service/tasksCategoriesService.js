import { insertCategoryToTheTask , insertCategoriesToTheTask , findTasksCategoriesByTaskId , findTasksCategoriesByCategoryId , removeTasksCategories } from '../repository/tasksCategoriesRepository.js';
import { TasksCategoriesNotFoundError } from '../error/TasksCategoriesNotFoundError.js';
import { DuplicateInsertError } from '../error/DuplicateInsertError.js';
import { NotFoundError } from '../error/NotFoundError.js';
import { CategoryNotFoundError } from '../error/CategoryNotFoundError.js';
import { findTaskById } from '../repository/tasksRepository.js';
import { TaskMatchUserError } from '../error/TaskMatchUserError.js';

export const addCategoryToTheTask = async (taskId, userId, categoryId) => {

    try {

        const task = await findTaskById(taskId, userId);

        if(!task) {
            throw new TaskMatchUserError();
        }

        return await insertCategoryToTheTask(taskId, categoryId);
    } catch (error) {

        if(error.code === '23505') {
            throw new DuplicateInsertError();
        } else if(error.code === '23503') {
            if(error.constraint === 'fk_tasks') {
                throw new NotFoundError();
            } else if(error.constraint === 'fk_categories') {
                throw new CategoryNotFoundError();
            }
        }

        throw error;
    }

};

export const addCategoriesToTheTask = async (userId, taskId, listIdCategories) => {

    try {
        const placeholder = listIdCategories.map((item, index) => `($1 , $${(index) + 2})`).join(', ');

        const task = await findTaskById(taskId, userId);

        if(!task) {
            throw new TaskMatchUserError();
        }    

        return await insertCategoriesToTheTask(taskId, listIdCategories, placeholder);
    } catch (error) {

        if(error.code === '23505') {
            throw new DuplicateInsertError();
        } else if(error.code === '23503') {
            if(error.constraint === 'fk_tasks') {
                throw new NotFoundError();
            } else if(error.constraint === 'fk_categories') {
                throw new CategoryNotFoundError();
            }
        }

        throw error;
        
    }

};

export const getTasksCategoriesByTaskId = async (id, userId) => {
    const task = await findTaskById(id, userId);

    if(!task) {
        throw new TaskMatchUserError();
    }

    return await findTasksCategoriesByTaskId(id, userId);
};

export const getTasksCategoriesByCategoryId = async (id, userId) => {
    return await findTasksCategoriesByCategoryId(id, userId);
};

export const deleteTasksCategoriesById = async(taskId, categoryId) => {

    const taskCategory = await removeTasksCategories(taskId, categoryId);

    if(!taskCategory){
        throw new TasksCategoriesNotFoundError();
    }
    
    return taskCategory;

};