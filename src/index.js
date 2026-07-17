import express from 'express';
import { getTasks, getTask } from './controller/tasksController.js';

const app = express();
const port = 3000;

app.get('/tasks/:id', getTask);

app.get('/tasks', getTasks);

app.get('/', (req, res) => {
    res.send('Mini Team Task Manager API is running');
});

app.listen(port, () => {
    console.log(`Mini Team Task Manager App listening on port ${port}`);
});