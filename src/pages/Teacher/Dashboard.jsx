
import React from 'react';
import Sidebar from '../../components/Sidebar';
import { User } from 'lucide-react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TeacherStudents from './Students';
import TeacherMarksEntry from './MarksEntry';
import TeacherLeaveApproval from './LeaveApproval';
import TeacherCreateCourse from './CreateCourse'; // NEW
import TeacherUpload from './Upload'; // NEW
import Events from '../Events';

const TeacherDashboard = ({ user, onLogout, children }) => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar role="teacher" onLogout={onLogout} />

            <main style={{ marginLeft: '300px', flex: 1, padding: '2rem' }}>
                <header className="glass" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem 2rem',
                    marginBottom: '2rem',
                    position: 'sticky',
                    top: '1rem',
                    zIndex: 9
                }}>
                    <div>
                        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Faculty Portal</h2>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Welcome, {user.name}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'var(--secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                        }}>
                            <User size={20} />
                        </div>
                    </div>
                </header>

                <div className="animate-fade-in">
                    {/* If children is passed (from App.jsx nesting), use it, otherwise define logic here. 
               Wait, App.jsx defines the routes nested inside TeacherDashboard wrapper. 
               However, children prop is just the Outlet content in some patterns. 
               Let's stick to App.jsx routing control for now, but I need to make sure CreateCourse and Upload exist in App.jsx routes.
               Wait, the previous App.jsx passed `children` which contained the Routes.
               So I don't need to redeclare Routes here. I just need to update App.jsx.
           */}
                    {children}
                </div>
            </main>
        </div>
    );
};

export default TeacherDashboard;
