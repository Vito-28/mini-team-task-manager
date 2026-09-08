import express from 'express';
import { getTasks, getTask, createTask, updateTask, deleteTask } from './controller/tasksController.js';
import logger from './middlewares/loggerMiddleware.js';
import authorization from './middlewares/authMiddleware.js';
import validation from './middlewares/validationMiddleware.js';
import errorHandler from './middlewares/errorMiddleware.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use(logger);

app.get('/users/:userId/tasks', authorization, getTasks);

app.delete('/tasks/:id', authorization, deleteTask);

app.put('/tasks/:id', authorization, validation, updateTask);

app.post('/tasks', authorization, validation, createTask);

app.get('/tasks/:id', authorization, getTask);

app.get('/tasks', authorization, getTasks);

app.get('/', (req, res) => {
    res.send('Mini Team Task Manager API is running');
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Mini Team Task Manager App listening on port ${port}`);
});