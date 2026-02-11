
import React, { useState, useEffect } from 'react';
import { getUsers } from '../../services/api';
import { Users, BookOpen } from 'lucide-react';

const AdminDashboard = ({ user }) => {
    const [stats, setStats] = useState({
        students: 0,
        faculty: 0,
        depts: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get all students
                const s = await getUsers('student');
                // Get all faculty
                const f = await getUsers('teacher');

                // Calculate unique departments
                const depts = new Set([...s.map(i => i.dept), ...f.map(i => i.dept)].filter(Boolean));

                setStats({
                    students: s.length,
                    faculty: f.length,
                    depts: depts.size
                });
            } catch (e) {
                console.error("Failed to fetch admin stats");
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2 style={{ marginBottom: '2rem' }}>Admin Dashboard</h2>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div className="glass" style={{ padding: '2rem', flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ padding: '1rem', background: 'rgba(99, 102, 241, 0.2)', borderRadius: '12px', color: 'var(--primary)' }}>
                        <Users size={32} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '2rem', marginBottom: '0.2rem' }}>{stats.students}</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Total Students</p>
                    </div>
                </div>

                <div className="glass" style={{ padding: '2rem', flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ padding: '1rem', background: 'rgba(236, 72, 153, 0.2)', borderRadius: '12px', color: 'var(--secondary)' }}>
                        <Users size={32} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '2rem', marginBottom: '0.2rem' }}>{stats.faculty}</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Total Faculty</p>
                    </div>
                </div>

                <div className="glass" style={{ padding: '2rem', flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '12px', color: 'var(--accent)' }}>
                        <BookOpen size={32} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '2rem', marginBottom: '0.2rem' }}>{stats.depts}</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Active Departments</p>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '3rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>Quick Actions</h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button style={{ padding: '1rem 2rem', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-primary)', cursor: 'pointer' }}>Generate Reports</button>
                    <button style={{ padding: '1rem 2rem', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-primary)', cursor: 'pointer' }}>System Settings</button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
