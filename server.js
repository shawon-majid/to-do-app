
const express = require('express');
const path = require('path');



const { showTasks, addTask, editTask, deleteTask, getTaskName } = require('./database');
const app = express();

app.use(express.json());
app.use(express.static('./public'));


app.get('/home', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'home.html'))
})

app.get('/edit/:id', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'editPage.html'));
})

app.get('/tasks', (req, res) => {
    showTasks().then((val) => {
        const [row] = val;
        res.json(row);
    })
})

app.delete('/tasks/:id', (req, res) => {
    deleteTask(req.params.id).then((val) => {
        console.log(val);
        res.send('deleted successfully');
    })
})

app.get('/tasks/:id', (req, res) => {
    getTaskName(req.params.id).then((val) => {

        res.json(val[0][0]);
    })
})

app.post('/tasks', (req, res) => {
    const { taskId, taskName } = req.body;
    addTask(taskId, taskName).then(() => {
        console.log(res);
        res.send('added successfully');
    })
})

app.put('/edit/:id', (req, res) => {

    const { taskId, taskName } = req.body;

    editTask(taskId, taskName).then(() => {
        console.log('Edited');
        res.send('Edit Success');
    })
})



app.listen(9090, () => {
    console.log('The Server started listening on port: 9090...')
})





