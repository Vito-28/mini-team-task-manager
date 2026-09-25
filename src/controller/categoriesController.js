import { getAllCategories , getCategoryById, createCategoryFromName , updateCategoryByIdAndName , deleteCategoryById } from '../service/categoriesService.js'

export const getCategories = async (req, res, next) => {

    try {
        const categories = await getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }

};

export const getCategory = async (req, res, next) => {

    try {
        const {categoryId} = req.params;
        const category = await getCategoryById(categoryId);
        
        res.status(200).json(category);
    } catch (error) {
        next(error);
    }

};

export const createCategory = async (req, res, next) => {

    try {
        const {name} = req.body;
    
        const category = await createCategoryFromName(name);

        res.status(201).json(category);
    } catch (error) {
        next(error);
    }

};

export const updateCategory = async (req, res, next) => {

    try {
        const {categoryId} = req.params;
        const {name} = req.body;

        const category = await updateCategoryByIdAndName(categoryId, name);

        res.status(200).json(category);        
    } catch (error) {
        next(error);
    }

};

export const deleteCategory = async (req, res, next) => {

    try {
        const {categoryId} = req.params;
        await deleteCategoryById(categoryId);

        res.status(204).end();       
    } catch (error) {
        next(error);
    }

};