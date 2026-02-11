const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'database.db');
const db = new Database(dbPath, { verbose: console.log });

// Enable foreign keys
db.pragma('foreign_keys = ON');

// --- Schema Creation ---

// Users Table
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    dept TEXT,
    year TEXT,
    sem TEXT,
    regNo TEXT,
    advisorId TEXT
  )
`).run();

// Courses Table
db.prepare(`
  CREATE TABLE IF NOT EXISTS courses (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    dept TEXT NOT NULL,
    year TEXT,
    sem TEXT,
    instructorId TEXT,
    materials JSON DEFAULT '[]'
  )
`).run();

// Marks Table
db.prepare(`
  CREATE TABLE IF NOT EXISTS marks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    studentId TEXT NOT NULL,
    courseId TEXT NOT NULL,
    subject TEXT,
    marks REAL,
    assignment REAL,
    FOREIGN KEY(studentId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(courseId) REFERENCES courses(id) ON DELETE CASCADE
  )
`).run();

// Leaves Table
db.prepare(`
  CREATE TABLE IF NOT EXISTS leaves (
    id TEXT PRIMARY KEY,
    studentId TEXT NOT NULL,
    studentName TEXT,
    advisorId TEXT,
    reason TEXT,
    date TEXT,
    status TEXT DEFAULT 'Pending'
  )
`).run();

// Events Table
db.prepare(`
  CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    date TEXT,
    location TEXT
  )
`).run();


// --- Seed Initial Data if Empty ---

const userCount = db.prepare('SELECT count(*) as count FROM users').get().count;

if (userCount === 0) {
    const insertUser = db.prepare('INSERT INTO users (id, name, email, password, role, dept) VALUES (@id, @name, @email, @password, @role, @dept)');

    insertUser.run({
        id: 'A001',
        name: 'Admin User',
        email: 'admin@sc.edu',
        password: 'admin',
        role: 'admin',
        dept: null
    });

    insertUser.run({
        id: 'T001',
        name: 'Dr. Alice Smith',
        email: 'alice@sc.edu',
        password: 'password',
        role: 'teacher',
        dept: 'Computer Science'
    });

    console.log('Database seeded with initial users.');
}

module.exports = db;
