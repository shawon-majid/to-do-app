const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


const { showTasks, addTask, editTask, deleteTask, getTaskName, addUser } = require('./database');
const app = express();




app.use(express.json());
app.use(express.static('./public'));
app.use(cookieParser());


app.get('/home', (req, res) => {

    if (req.cookies && req.cookies['tokentodo']) {

        // now authenticate this token
        // if authentication true return the page, or again access denied
        // will do it later

        res.sendFile(path.resolve(__dirname, 'public', 'home.html'))
    }
    else {
        res.status(403).send("Access Denied!!")
    }

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


// reg and login related

app.post('/reg', async (req, res) => {


    const { username, email, password } = req.body;


    try {
        await addUser(username, email, password);
        res.status(200).json({ message: 'Registration Successful' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong: ' + err });
    }
})


app.listen(9090, () => {
    console.log('The Server started listening on port: 9090...')
})





