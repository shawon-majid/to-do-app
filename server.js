
const express = require('express');
const { showTasks, addTask, editTask, deleteTask } = require('./database');
const app = express();

app.use(express.json());
app.use(express.static('./public'));

app.get('/tasks', (req, res) => {
    showTasks().then((val) => {
        const [row] = val;
        res.json(row);
    })
})

app.delete('/tasks/:id', (req, res) => {
    deleteTask(req.params.id).then(() => {
        console.log(res);
        res.send('deleted successfully');
    })
})


app.listen(9090, () => {
    console.log('The Server started listening on port: 9090...')
})





