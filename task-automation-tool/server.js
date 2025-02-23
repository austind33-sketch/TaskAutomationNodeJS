// server.js

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const schedule = require('node-schedule');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3001; // Changed port to 3001

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Initialize SQLite database in memory
const db = new sqlite3.Database(':memory:');

// Create the tasks table
db.serialize(() => {
    db.run("CREATE TABLE tasks (id INTEGER PRIMARY KEY, name TEXT, description TEXT, time TEXT, recurrence TEXT)", (err) => {
        if (err) {
            console.error('Failed to create tasks table:', err);
        } else {
            console.log('Tasks table created successfully');
        }
    });
    db.run("CREATE TABLE completed_tasks (id INTEGER PRIMARY KEY, name TEXT, description TEXT, time TEXT)", (err) => {
        if (err) {
            console.error('Failed to create completed tasks table:', err);
        } else {
            console.log('Completed tasks table created successfully');
        }
    });
});

// Route to add a new task
app.post('/add-task', (req, res) => {
    const { name, description, time, recurrence } = req.body;

    // Insert the new task into the database
    db.run("INSERT INTO tasks (name, description, time, recurrence) VALUES (?, ?, ?, ?)", [name, description, time, recurrence], function(err) {
        if (err) {
            return res.status(500).send("Error adding task");
        }
        const taskId = this.lastID;

        // Schedule the task using node-schedule
        let scheduleRule;
        switch (recurrence) {
            case 'daily':
                scheduleRule = { hour: new Date(time).getHours(), minute: new Date(time).getMinutes() };
                break;
            case 'weekly':
                scheduleRule = { dayOfWeek: new Date(time).getDay(), hour: new Date(time).getHours(), minute: new Date(time).getMinutes() };
                break;
            case 'yearly':
                scheduleRule = { month: new Date(time).getMonth(), date: new Date(time).getDate(), hour: new Date(time).getHours(), minute: new Date(time).getMinutes() };
                break;
            default:
                scheduleRule = new Date(time);
        }

        schedule.scheduleJob(scheduleRule, () => {
            console.log(`Executing task: ${name}`);
            db.run("INSERT INTO completed_tasks (name, description, time) VALUES (?, ?, ?)", [name, description, time], (err) => {
                if (err) {
                    console.error('Failed to insert completed task:', err);
                } else {
                    console.log('Completed task inserted successfully');
                }
            });
        });

        res.send(`Task added and scheduled with ID ${taskId}!`);
    });
});

// Route to get all tasks
app.get('/tasks', (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) {
            return res.status(500).send("Error retrieving tasks");
        }
        res.json(rows);
    });
});

// Route to get all completed tasks
app.get('/completed-tasks', (req, res) => {
    db.all("SELECT * FROM completed_tasks", [], (err, rows) => {
        if (err) {
            return res.status(500).send("Error retrieving completed tasks");
        }
        res.json(rows);
    });
});

// Route to clear all tasks
app.post('/clear-tasks', (req, res) => {
    db.run("DELETE FROM tasks", (err) => {
        if (err) {
            return res.status(500).send("Error clearing tasks");
        }
        res.send("All tasks cleared!");
    });
});

// Simple test route
app.get('/test', (req, res) => {
    res.send('Server is running!');
});

// Start the server and listen on the specified port
app.listen(port, (err) => {
    if (err) {
        console.error('Failed to start server:', err);
    } else {
        console.log(`Server running at http://localhost:${port}`);
    }
});

// Log a message to indicate the server script has been executed
console.log('Server script executed');