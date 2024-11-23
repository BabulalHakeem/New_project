const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Create a new task
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    const query = 'INSERT INTO tasks (title, status) VALUES (?, ?)';
    db.run(query, [title, 0], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ id: this.lastID, title, status: 0 });
        }
    });
});

// Get all tasks
app.get('/tasks', (req, res) => {
    const query = 'SELECT * FROM tasks';
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(rows);
        }
    });
});
app.get('/', (req, res) => {
    res.send('Welcome to the To-Do List API!');
}); 
// Update a task
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, status } = req.body;
    const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';
    db.run(query, [title, status, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Task not found' });
        } else {
            res.status(200).json({ id, title, status });
        }
    });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM tasks WHERE id = ?';
    db.run(query, [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Task not found' });
        } else {
            res.status(200).json({ message: 'Task deleted successfully' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
