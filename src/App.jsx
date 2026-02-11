import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/Student/Dashboard';
import TeacherDashboard from './pages/Teacher/Dashboard';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminDashboardLayout from './pages/Admin/Layout';
import StudentProfile from './pages/Student/Profile';
import StudentMarks from './pages/Student/Marks';
import StudentLeave from './pages/Student/Leave';
import StudentCourses from './pages/Student/Courses';
import TeacherStudents from './pages/Teacher/Students';
import TeacherMarksEntry from './pages/Teacher/MarksEntry';
import TeacherLeaveApproval from './pages/Teacher/LeaveApproval';
import TeacherCreateCourse from './pages/Teacher/CreateCourse';
import TeacherUpload from './pages/Teacher/Upload';
import Events from './pages/Events'; // Shared
import AdminStudents from './pages/Admin/Students';
import AdminFaculty from './pages/Admin/Faculty';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to={`/${user.role}`} />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to={`/${user.role}`} />} />

        {/* Student Routes */}
        <Route path="/student/*" element={user && user.role === 'student' ? (
          <StudentDashboard user={user} onLogout={handleLogout}>
            <Routes>
              <Route path="profile" element={<StudentProfile user={user} />} />
              <Route path="marks" element={<StudentMarks user={user} />} />
              <Route path="leave" element={<StudentLeave user={user} />} />
              <Route path="courses" element={<StudentCourses user={user} />} />
              <Route path="events" element={<Events user={user} />} />
              <Route path="*" element={<Navigate to="profile" />} />
            </Routes>
          </StudentDashboard>
        ) : <Navigate to="/login" />} />

        {/* Teacher Routes */}
        <Route path="/teacher/*" element={user && user.role === 'teacher' ? (
          <TeacherDashboard user={user} onLogout={handleLogout}>
            <Routes>
              <Route path="students" element={<TeacherStudents user={user} />} />
              <Route path="marks-entry" element={<TeacherMarksEntry user={user} />} />
              <Route path="create-course" element={<TeacherCreateCourse user={user} />} />
              <Route path="upload" element={<TeacherUpload user={user} />} />
              <Route path="leave-approval" element={<TeacherLeaveApproval user={user} />} />
              <Route path="events" element={<Events user={user} />} />
              <Route path="*" element={<Navigate to="students" />} />
            </Routes>
          </TeacherDashboard>
        ) : <Navigate to="/login" />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={user && user.role === 'admin' ? (
          <AdminDashboardLayout user={user} onLogout={handleLogout}> {/* Renamed or Wrapped */}
            <Routes>
              <Route path="dashboard" element={<AdminDashboard user={user} />} />
              <Route path="students" element={<AdminStudents />} />
              <Route path="faculty" element={<AdminFaculty />} />
              <Route path="*" element={<Navigate to="dashboard" />} />
            </Routes>
          </AdminDashboardLayout>
        ) : <Navigate to="/login" />} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
