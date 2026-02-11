const db = require('./database.js');

try {
    const check = db.prepare("SELECT * FROM users WHERE email = 'srihariram@sc.edu'").get();
    if (!check) {
        db.prepare(`
            INSERT INTO users (id, name, email, password, role, dept, year, sem, regNo) 
            VALUES ('S001', 'Srihariram', 'srihariram@sc.edu', 'password', 'student', 'Computer Science', '4', '7', '12345678')
        `).run();
        console.log('Added Student: srihariram@sc.edu');
    } else {
        console.log('Student srihariram@sc.edu already exists');
    }

    const checkTeacher = db.prepare("SELECT * FROM users WHERE email = 'alice@sc.edu'").get();
    if (!checkTeacher) {
        db.prepare(`
            INSERT INTO users (id, name, email, password, role, dept) 
            VALUES ('T001', 'Dr. Alice Smith', 'alice@sc.edu', 'password', 'teacher', 'Computer Science')
        `).run();
        console.log('Added Teacher: alice@sc.edu');
    } else {
        console.log('Teacher alice@sc.edu already exists');
    }

} catch (e) {
    console.error('Error adding users:', e);
}
