import express from 'express';
import { getTasks, getTask, createTask, updateTask, deleteTask } from './controller/tasksController.js';

const app = express();
const port = 3000;

app.use(express.json());

app.delete('/tasks/:id', deleteTask);

app.put('/tasks/:id', updateTask);

app.post('/tasks', createTask);

app.get('/tasks/:id', getTask);

app.get('/tasks', getTasks);

app.get('/', (req, res) => {
    res.send('Mini Team Task Manager API is running');
});

app.listen(port, () => {
    console.log(`Mini Team Task Manager App listening on port ${port}`);
});