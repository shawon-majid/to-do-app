const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();


const { showTasks, addTask, editTask, deleteTask, getTaskName, addUser, getUser } = require('./database');
const app = express();


app.use(express.json());
app.use(express.static('./public'));
app.use(cookieParser());

// middleware for verifying jwt
const cookieJwtAuth = (req, res, next) => {
    const token = req.cookies.tokentodo;
    try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        req.user = user;
        next();
    } catch (err) {
        req.user = null;
        res.clearCookie("tokentodo");
        res.status(500).send(`<h1 style="text-align: center;">Token is not verified or expired, login again!</h1>
        <a href="/">
          <button style="display: block; margin: 0 auto;">Login</button>
        </a>`);
    }
};




// routes

app.get('/home', cookieJwtAuth, (req, res) => {

    if (req.cookies && req.cookies['tokentodo']) {
        res.sendFile(path.resolve(__dirname, 'public', 'home.html'))
    }
    else {
        res.status(403).send("Access Denied!!")
    }

})

app.get('/edit/:id', cookieJwtAuth, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'editPage.html'));
})

app.get('/tasks', cookieJwtAuth, (req, res) => {

    showTasks(req.user.email).then((val) => {
        const [row] = val;
        res.json(row);
    }).catch(err => {
        res.status(500).json({ error: `Internal server error: ${err}` });
    })
})

app.delete('/tasks/:id', cookieJwtAuth, (req, res) => {

    deleteTask(req.params.id).catch(err => {
        res.status(500).json({ error: `Internal server error: ${err}` })
    })
})

app.get('/tasks/:id', cookieJwtAuth, (req, res) => {
    getTaskName(req.params.id).then((val) => {
        res.json(val[0][0]);
    }).catch(err => {
        res.status(500).json({ error: `Internal server error: ${err}` })
    })
})

app.post('/tasks', cookieJwtAuth, (req, res) => {
    const { taskId, taskName } = req.body;
    const email = req.user.email;
    addTask(taskId, taskName, email).catch(err => {
        res.status(500).json({ error: `Internal server error: ${err}` })
    })
})

app.put('/edit/:id', cookieJwtAuth, (req, res) => {
    const { taskId, taskName } = req.body;
    editTask(taskId, taskName).catch(err => {
        res.status(500).json({ error: `Internal server error: ${err}` })
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

app.get('/login/', async (req, res) => {
    const { email, password } = req.query;

    try {
        const value = await getUser(email);

        const user = value[0][0];

        if (user && user.password == password) { // verified

            // if verified user, generate a token and set it  to cookies

            const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "1h" })
            res.cookie('tokentodo', token);
            res.user = user;

            return res.sendStatus(200).end();
        }
        else {
            return res.sendStatus(500);
        }


    }
    catch (err) {
        res.send(err);
    }
})


app.get('/logout', (req, res) => {
    req.user = null;
    return res.clearCookie("tokentodo").status(200).end();
})


app.listen(9090, () => {
    console.log('The Server started listening on port: 9090...')
})
