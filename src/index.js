import express from 'express';
import { registerUser, loginUser } from './controller/authController.js';
import { getTasks, getTask, createTask, updateTask, deleteTask } from './controller/tasksController.js';
import logger from './middlewares/loggerMiddleware.js';
import authorization from './middlewares/authMiddleware.js';
import { validationCategories, validationName, validationPassword, validationTitle, validationTypeCategories, validationTypeCategoryID, validationTypeCompleted, validationTypeIDCategories, validationTypeName, validationTypePassword, validationTypeTaskIDBody, validationTypeTaskIDParam, validationTypeTitle } from './middlewares/validationMiddleware.js';
import errorHandler from './middlewares/errorMiddleware.js';
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from './controller/categoriesController.js';
import { addCategories, addCategory, deleteTasksCategories, getCategoriesTasks, getTasksCategories } from './controller/tasksCategoriesController.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use(logger);

//routes sign in and sign up

app.post('/auth/register', validationTypeName, validationName, validationTypePassword, validationPassword, registerUser);

app.post('/auth/login', validationTypeName, validationName, validationTypePassword, validationPassword, loginUser);

//routes tasks

app.get('/tasks', authorization, validationTypeCompleted, getTasks);

app.get('/tasks/:taskId', authorization, validationTypeTaskIDParam, getTask);

app.post('/tasks', authorization, validationTypeTitle, validationTitle, createTask);

app.put('/tasks/:taskId', authorization, validationTypeTaskIDParam, validationTypeTitle, validationTitle, updateTask);

app.delete('/tasks/:taskId', authorization, validationTypeTaskIDParam, deleteTask);

// routes tasks_categories

app.post('/tasks/:taskId/categories/:categoryId', authorization, validationTypeTaskIDParam, validationTypeCategoryID, addCategory);

app.get('/categories/:categoryId/tasks', authorization, validationTypeCategoryID, getCategoriesTasks);

app.get('/tasks/:taskId/categories', authorization, validationTypeTaskIDParam, getTasksCategories);

app.delete('/tasks/:taskId/categories/:categoryId', authorization, validationTypeTaskIDParam, validationTypeCategoryID, deleteTasksCategories);

app.post('/tasks_categories', authorization, validationTypeTaskIDBody, validationTypeCategories, validationCategories, validationTypeIDCategories, addCategories);

// routes categories

app.delete('/categories/:categoryId', authorization, validationTypeCategoryID, deleteCategory);

app.put('/categories/:categoryId', authorization, validationTypeCategoryID, validationTypeName, validationName, updateCategory);

app.post('/categories', authorization, validationTypeName, validationName, createCategory);

app.get('/categories/:categoryId', authorization, validationTypeCategoryID, getCategory);

app.get('/categories', authorization, getCategories);

app.get('/', (req, res) => {
    res.send('Mini Team Task Manager API is running');
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Mini Team Task Manager App listening on port ${port}`);
});
