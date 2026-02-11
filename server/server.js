const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const csv = require('csv-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Import SQLite helper
const db = require('./database.js');

app.use(cors());
app.use(bodyParser.json());

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });


// --- AUTH & USER MANAGEMENT ---

// Register
app.post('/api/register', (req, res) => {
    const { name, email, password, role, ...details } = req.body;

    const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const id = role.charAt(0).toUpperCase() + Date.now().toString().slice(-4);

    // SQLite insert
    try {
        const stmt = db.prepare(`
            INSERT INTO users (id, name, email, password, role, dept, year, sem, regNo, advisorId) 
            VALUES (@id, @name, @email, @password, @role, @dept, @year, @sem, @regNo, @advisorId)
        `);

        stmt.run({
            id,
            name,
            email,
            password,
            role,
            dept: details.dept || null,
            year: details.year || null,
            sem: details.sem || null,
            regNo: details.regNo || null,
            advisorId: details.advisorId || null
        });

        const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
        const { password: _, ...userNoPass } = user;
        res.status(201).json({ message: 'User registered successfully', user: userNoPass });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Database error' });
    }
});

// Login
app.post('/api/login', (req, res) => {
    const { email, password, role } = req.body;

    const user = db.prepare('SELECT * FROM users WHERE email = ? AND password = ? AND role = ?').get(email, password, role);

    if (user) {
        const { password, ...userWithoutPass } = user;
        res.json({ message: 'Login successful', user: userWithoutPass });
    } else {
        res.status(401).json({ message: 'Invalid credentials or role' });
    }
});

// Get Users (e.g., for Teacher to see Students)
app.get('/api/users', (req, res) => {
    const { role, dept } = req.query;
    let query = 'SELECT id, name, email, role, dept, year, sem, regNo FROM users WHERE 1=1';
    const params = [];

    if (role) {
        query += ' AND role = ?';
        params.push(role);
    }
    if (dept) {
        query += ' AND dept = ?';
        params.push(dept);
    }

    const users = db.prepare(query).all(...params);
    res.json(users);
});

// Update User (e.g., Teacher updating student profile)
app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { password, ...updateData } = req.body; // Don't allow password update

    const existingUser = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Build dynamic update query
    const fields = Object.keys(updateData);
    if (fields.length === 0) return res.json({ message: 'No fields to update' });

    const setClause = fields.map(k => `${k} = ?`).join(', ');
    const values = fields.map(k => updateData[k]);
    values.push(id);

    try {
        db.prepare(`UPDATE users SET ${setClause} WHERE id = ?`).run(...values);
        const updatedUser = db.prepare('SELECT id, name, email, role, dept, year, sem, regNo FROM users WHERE id = ?').get(id);
        res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: 'Update failed' });
    }
});

// --- COURSES ---

// Create Course
app.post('/api/courses', (req, res) => {
    const { name, dept, year, sem, instructorId, materials = [] } = req.body;
    const id = 'C' + Date.now().toString().slice(-4);

    try {
        db.prepare(`
            INSERT INTO courses (id, name, dept, year, sem, instructorId, materials)
            VALUES (@id, @name, @dept, @year, @sem, @instructorId, @materials)
        `).run({
            id, name, dept, year, sem, instructorId,
            materials: JSON.stringify(materials)
        });
        res.status(201).json({ id, name, dept, year, sem, instructorId, materials });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create course' });
    }
});

// Get Courses
app.get('/api/courses', (req, res) => {
    const { dept, year } = req.query;
    let query = 'SELECT * FROM courses WHERE 1=1';
    const params = [];

    if (dept) {
        query += ' AND dept = ?';
        params.push(dept);
    }
    if (year) {
        query += ' AND year = ?';
        params.push(year);
    }

    const courses = db.prepare(query).all(...params);
    // Parse materials JSON
    const parsedCourses = courses.map(c => ({
        ...c,
        materials: JSON.parse(c.materials || '[]')
    }));
    res.json(parsedCourses);
});

// --- MARKS ---

// Get Marks for a Student
app.get('/api/marks/:studentId', (req, res) => {
    const marks = db.prepare('SELECT * FROM marks WHERE studentId = ?').all(req.params.studentId);
    res.json(marks);
});

// Add/Update Marks (Teacher)
app.post('/api/marks', (req, res) => {
    const { studentId, courseId, marks, assignment, subject } = req.body;

    const existing = db.prepare('SELECT * FROM marks WHERE studentId = ? AND courseId = ?').get(studentId, courseId);

    if (existing) {
        db.prepare(`
            UPDATE marks SET marks = ?, assignment = ? WHERE studentId = ? AND courseId = ?
        `).run(marks, assignment, studentId, courseId);
    } else {
        db.prepare(`
            INSERT INTO marks (studentId, courseId, marks, assignment, subject)
            VALUES (?, ?, ?, ?, ?)
        `).run(studentId, courseId, marks, assignment, subject || 'Unknown');
    }

    res.json({ message: 'Marks updated successfully' });
});

// --- LEAVES ---

// Get Leaves
app.get('/api/leaves', (req, res) => {
    const { studentId, advisorId } = req.query;
    let query = 'SELECT * FROM leaves WHERE 1=1';
    const params = [];

    if (studentId) {
        query += ' AND studentId = ?';
        params.push(studentId);
    }
    if (advisorId) {
        query += ' AND advisorId = ?';
        params.push(advisorId);
    }

    const leaves = db.prepare(query).all(...params);
    res.json(leaves);
});

// Submit Leave Request
app.post('/api/leaves', (req, res) => {
    const { studentId, studentName, advisorId, reason, date } = req.body;
    const id = 'L' + Date.now().toString().slice(-4);

    try {
        db.prepare(`
            INSERT INTO leaves (id, studentId, studentName, advisorId, reason, date, status)
            VALUES (?, ?, ?, ?, ?, ?, 'Pending')
        `).run(id, studentId, studentName, advisorId, reason, date);

        res.status(201).json({ id, studentId, studentName, advisorId, reason, date, status: 'Pending' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to submit leave' });
    }
});

// Update Leave Status
app.put('/api/leaves/:id/status', (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    const info = db.prepare('UPDATE leaves SET status = ? WHERE id = ?').run(status, id);
    if (info.changes > 0) {
        const updated = db.prepare('SELECT * FROM leaves WHERE id = ?').get(id);
        res.json(updated);
    } else {
        res.status(404).json({ message: 'Leave request not found' });
    }
});

// --- EVENTS ---

app.get('/api/events', (req, res) => {
    const events = db.prepare('SELECT * FROM events').all();
    res.json(events);
});

// Add Event
app.post('/api/events', (req, res) => {
    const { title, description, date, location } = req.body;
    const id = 'E' + Date.now().toString().slice(-4);

    try {
        db.prepare(`
            INSERT INTO events (id, title, description, date, location)
            VALUES (?, ?, ?, ?, ?)
        `).run(id, title, description, date, location);
        res.status(201).json({ id, title, description, date, location });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create event' });
    }
});

// --- BULK UPLOAD ---
app.post('/api/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    const results = [];

    fs.createReadStream(file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            if (results.length > 0) {
                const keys = Object.keys(results[0]).map(k => k.toLowerCase());
                let table = '';

                // Transactional insert for better performance
                const insertTransaction = db.transaction((rows) => {
                    if (keys.includes('email') && keys.includes('role')) {
                        // User Upload
                        const stmt = db.prepare(`
                            INSERT OR IGNORE INTO users (id, name, email, password, role, dept, year, sem, regNo, advisorId) 
                            VALUES (@id, @name, @email, @password, @role, @dept, @year, @sem, @regNo, @advisorId)
                        `);
                        rows.forEach(row => {
                            stmt.run({
                                id: row.role.charAt(0).toUpperCase() + Date.now().toString().slice(-4) + Math.floor(Math.random() * 100),
                                name: row.name,
                                email: row.email,
                                password: row.password || 'password',
                                role: row.role,
                                dept: row.dept,
                                year: row.year,
                                sem: row.sem,
                                regNo: row.regNo,
                                advisorId: row.advisorId
                            });
                        });
                    } else if (keys.includes('coursename') || keys.includes('code')) {
                        // Course Upload
                        const stmt = db.prepare(`
                            INSERT OR IGNORE INTO courses (id, name, dept, year, sem, instructorId, materials)
                            VALUES (@id, @name, @dept, @year, @sem, @instructorId, '[]')
                        `);
                        rows.forEach(row => {
                            stmt.run({
                                id: 'C' + Date.now().toString().slice(-4) + Math.floor(Math.random() * 100),
                                name: row.coursename || row.name,
                                dept: row.dept,
                                year: row.year,
                                sem: row.sem,
                                instructorId: row.instructorid || 'T001'
                            });
                        });
                    } else if (keys.includes('studentid') && keys.includes('marks')) {
                        // Marks Upload
                        // Assuming update or insert logic
                        const checkStmt = db.prepare('SELECT id FROM marks WHERE studentId = ? AND courseId = ?');
                        const updateStmt = db.prepare('UPDATE marks SET marks = ?, assignment = ? WHERE id = ?');
                        const insertStmt = db.prepare('INSERT INTO marks (studentId, courseId, marks, assignment, subject) VALUES (?, ?, ?, ?, ?)');

                        rows.forEach(row => {
                            const exists = checkStmt.get(row.studentid, row.courseid);
                            if (exists) {
                                updateStmt.run(row.marks, row.assignment || 0, exists.id);
                            } else {
                                insertStmt.run(row.studentid, row.courseid, row.marks, row.assignment || 0, row.subject || 'Unknown');
                            }
                        });
                    }
                });

                try {
                    insertTransaction(results);
                    fs.unlinkSync(file.path);
                    res.json({ message: 'File processed successfully', count: results.length });
                } catch (err) {
                    console.error("Transaction Error", err);
                    fs.unlinkSync(file.path);
                    res.status(500).json({ message: 'Failed to process data' });
                }

            } else {
                fs.unlinkSync(file.path);
                res.status(400).json({ message: 'Empty or unparseable file.' });
            }
        });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
