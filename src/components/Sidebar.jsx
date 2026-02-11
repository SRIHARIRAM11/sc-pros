
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ClipboardList, Send, Calendar, Folder, Users, LogOut, Upload, BookOpen } from 'lucide-react';

const Sidebar = ({ role, onLogout }) => {
    const routes = role === 'student' ? [
        { path: 'profile', label: 'Profile', icon: Home },
        { path: 'marks', label: 'Marks', icon: ClipboardList },
        { path: 'leave', label: 'Leave', icon: Send },
        { path: 'events', label: 'Events', icon: Calendar },
        { path: 'courses', label: 'Courses', icon: Folder },
    ] : role === 'teacher' ? [
        { path: 'students', label: 'Students', icon: Users },
        { path: 'marks-entry', label: 'Enter Marks', icon: ClipboardList },
        { path: 'create-course', label: 'Add Course', icon: BookOpen },
        { path: 'upload', label: 'Upload Data', icon: Upload },
        { path: 'leave-approval', label: 'Approve Leave', icon: Send },
        { path: 'events', label: 'Events', icon: Calendar },
    ] : [
        { path: 'dashboard', label: 'Dashboard', icon: Home },
        { path: 'students', label: 'All Students', icon: Users },
        { path: 'faculty', label: 'All Faculty', icon: Users },
    ];

    return (
        <aside
            className="glass"
            style={{
                width: '260px',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '95vh',
                margin: '2.5vh 0 2.5vh 2.5vh',
                position: 'fixed',
                zIndex: 10
            }}
        >
            <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem', color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.5rem', gap: '0.5rem' }}>
                    SC-PRO
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {routes.map((route) => (
                        <NavLink
                            key={route.path}
                            to={`/${role}/${route.path}`}
                            className={({ isActive }) =>
                                isActive ? "sidebar-link active" : "sidebar-link"
                            }
                            style={({ isActive }) => ({
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '0.8rem 1rem',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                color: isActive ? 'white' : 'var(--text-secondary)',
                                background: isActive ? 'var(--primary)' : 'transparent',
                                transition: 'all 0.3s ease'
                            })}
                        >
                            <route.icon size={20} />
                            {route.label}
                        </NavLink>
                    ))}
                </nav>
            </div>

            <button
                onClick={onLogout}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    color: '#ef4444',
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: 'auto'
                }}
            >
                <LogOut size={20} />
                Logout
            </button>
        </aside>
    );
};

export default Sidebar;
