import express from 'express';
import { getTasks, getTask, createTask, updateTask, deleteTask } from './controller/tasksController.js';
import logger from './middlewares/loggerMiddleware.js';
import authorization from './middlewares/authMiddleware.js';
import { validationName, validationTitle, validationTypeCategoryID, validationTypeTaskIDBody, validationTypeTaskIDParam } from './middlewares/validationMiddleware.js';
import errorHandler from './middlewares/errorMiddleware.js';
import { createUser, deleteUser, getUser, getUsers, updateUser } from './controller/usersController.js';
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from './controller/categoriesController.js';
import { addCategories, addCategory, deleteTasksCategories, getCategoriesTasks, getTasksCategories } from './controller/tasksCategoriesController.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use(logger);

app.delete('/tasks/:taskId', authorization, validationTypeTaskIDParam, deleteTask);

app.delete('/users/:id', authorization, deleteUser);

app.delete('/categories/:categoryId', authorization, validationTypeCategoryID, deleteCategory);

app.delete('/tasks/:taskId/categories/:categoryId', authorization, validationTypeTaskIDParam, validationTypeCategoryID, deleteTasksCategories);

app.put('/tasks/:taskId', authorization, validationTypeTaskIDParam, validationTitle, updateTask);

app.put('/users/:id', authorization, validationName, updateUser);

app.put('/categories/:categoryId', authorization, validationTypeCategoryID, validationName, updateCategory);

app.post('/tasks', authorization, validationTitle, createTask);

app.post('/users', authorization, validationName, createUser);

app.post('/categories', authorization, validationName, createCategory);

app.post('/tasks/:taskId/categories/:categoryId', authorization, validationTypeTaskIDParam, validationTypeCategoryID, addCategory);

app.post('/tasks_categories', authorization, validationTypeTaskIDBody, addCategories);

app.get('/categories/:categoryId/tasks', authorization, validationTypeCategoryID, getCategoriesTasks);

app.get('/tasks/:taskId/categories', authorization, validationTypeTaskIDParam, getTasksCategories);

app.get('/users/:userId/tasks', authorization, getTasks);

app.get('/tasks/:taskId', authorization, validationTypeTaskIDParam, getTask);

app.get('/users/:id', authorization, getUser);

app.get('/categories/:categoryId', authorization, validationTypeCategoryID, getCategory);

app.get('/tasks', authorization, getTasks);

app.get('/users', authorization, getUsers);

app.get('/categories', authorization, getCategories);

app.get('/', (req, res) => {
    res.send('Mini Team Task Manager API is running');
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Mini Team Task Manager App listening on port ${port}`);
});
