import { findAllCategories , findCategoryById , insertCategory , editCategory , removeCategory} from '../repository/categoriesRepository.js';
import { CategoryNotFoundError } from '../error/CategoryNotFoundError.js';
import { TaskAssignedCategoryError } from '../error/TaskAssignedCategoryError.js';

export const getAllCategories = async () => {
    return await findAllCategories();
};

export const getCategoryById = async (id) => {
    const category = await findCategoryById(id);
    
    if(!category) {
        throw new CategoryNotFoundError();
    }
    
    return category;
};

export const createCategoryFromName = async (name) => {
    return await insertCategory(name);
};

export const updateCategoryByIdAndName = async (id, name) => {

    const newCategory = await editCategory(id, name);

    if (!newCategory) {
        throw new CategoryNotFoundError();
    }


    return newCategory;
};

export const deleteCategoryById = async(id) => {


    try {
        const category = await removeCategory(id);

        if(!category){
            throw new CategoryNotFoundError();
        }

        return category;
    } catch (error) {
        if(error.code === '23503') {
            throw new TaskAssignedCategoryError();
        }

        throw error;
    }

};