const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./todo.db', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to SQLite database.');

        // Create the tasks table if it doesn't exist
        db.run(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                status BOOLEAN NOT NULL DEFAULT 0
            )
        `, (err) => {
            if (err) {
                console.error('Error creating table', err.message);
            }
        });
    }
});

module.exports = db;
