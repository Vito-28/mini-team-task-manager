import { insertCategoryToTheTask , insertCategoriesToTheTask , findTasksCategoriesByTaskId , findTasksCategoriesByCategoryId , removeTasksCategories } from '../repository/tasksCategoriesRepository.js';
import { TasksCategoriesNotFoundError } from '../error/TasksCategoriesNotFoundError.js';
import { DuplicateInsertError } from '../error/DuplicateInsertError.js';
import { NotFoundError } from '../error/NotFoundError.js';
import { CategoryNotFoundError } from '../error/CategoryNotFoundError.js';

export const addCategoryToTheTask = async (taskId, categoryId) => {

    try {
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

export const addCategoriesToTheTask = async (taskId, listIdCategories) => {

    try {

        const placeholder = listIdCategories.map((item, index) => `($1 , $${Number(index) + 2})`).join(', ');

        console.log(placeholder)

        return await insertCategoriesToTheTask(taskId, listIdCategories, placeholder);

    } catch(error) {

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

export const getTasksCategoriesByTaskId = async (id) => {
    return await findTasksCategoriesByTaskId(id);
};

export const getTasksCategoriesByCategoryId = async (id) => {
    return await findTasksCategoriesByCategoryId(id);
};

export const deleteTasksCategoriesById = async(taskId, categoryId) => {

    const taskCategory = await removeTasksCategories(taskId, categoryId);

    if(!taskCategory){
        throw new TasksCategoriesNotFoundError();
    }
    
    return taskCategory;

};