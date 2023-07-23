

const mysql = require('mysql2');

const dotenv = require('dotenv');

dotenv.config();


const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();


const showTasks = async (email) => {

    try {
        let sql = `
        SELECT * FROM tasks
        WHERE email = ?
        ORDER BY timestamp_column ASC;
        `;
        const result = await pool.query(sql, [email]);
        return result;
    } catch (err) {
        throw new Error("Error fetching data from the database");
    }

}

const addTask = async (taskId, taskName, email) => {

    try {
        let sql = `
            INSERT INTO tasks(taskId, taskName, email)
            VALUES (?, ?, ?)
        `;

        const result = await pool.query(sql, [taskId, taskName, email]);
        return result;
    } catch (err) {
        throw new Error("Error adding task in the database");
    }


}


const deleteTask = async (taskId) => {

    try {
        let sql = `
        DELETE FROM tasks
        WHERE taskId = ?
        `;

        const result = await pool.query(sql, taskId);
        return result;
    }
    catch (err) {
        throw new Error("Couldn't Delete data from the Database!");
    }



}

const editTask = async (taskId, taskName) => {

    try {
        let sql = `
            UPDATE tasks
            SET taskName = ?
            WHERE taskId = ?
        `;

        const result = await pool.query(sql, [taskName, taskId]);
        return result;
    }
    catch (err) {
        throw new Error("Failed to connect to the database!");
    }

}


const getTaskName = async (id) => {

    try {
        let sql = `
            SELECT taskName 
            FROM tasks 
            WHERE taskId = ?
        `;

        const result = await pool.query(sql, id);
        return result;
    }
    catch (err) {
        throw new Error("Couldn't fetch data from the database");
    }


}

const addUser = async (username, email, hashedPassword) => {

    try {
        let sql = `
            INSERT INTO users
            VALUES("${username}", "${email}", "${hashedPassword}")
        `;

        const result = await pool.query(sql);
        return result;
    }
    catch (err) {
        throw new Error("Error Adding user in the database");
    }


}


const getUser = async (email) => {

    try {
        let sql = `
            SELECT * FROM users
            WHERE email = "${email}"
        `;

        const result = await pool.query(sql);
        return result;
    }
    catch (err) {
        throw new Error("Error fetching user from the database!");
    }


}


module.exports = { showTasks, addTask, editTask, deleteTask, getTaskName, addUser, getUser }

