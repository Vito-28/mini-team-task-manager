import express from 'express';
import { getTasks, getTask, createTask, updateTask, deleteTask } from './controller/tasksController.js';
import logger from './middlewares/loggerMiddleware.js';
import authorization from './middlewares/authMiddleware.js';
import { validationName, validationTitle } from './middlewares/validationMiddleware.js';
import errorHandler from './middlewares/errorMiddleware.js';
import { createUser, deleteUser, getUser, getUsers, updateUser } from './controller/usersController.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use(logger);

app.delete('/tasks/:id', authorization, deleteTask);

app.delete('/users/:id', authorization, deleteUser);

app.put('/tasks/:id', authorization, validationTitle, updateTask);

app.put('/users/:id', authorization, validationName, updateUser);

app.post('/tasks', authorization, validationTitle, createTask);

app.post('/users', authorization, validationName, createUser);

app.get('/users/:userId/tasks', authorization, getTasks);

app.get('/tasks/:id', authorization, getTask);

app.get('/users/:id', authorization, getUser);

app.get('/tasks', authorization, getTasks);

app.get('/users', authorization, getUsers);

app.get('/', (req, res) => {
    res.send('Mini Team Task Manager API is running');
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Mini Team Task Manager App listening on port ${port}`);
});