
import React from 'react';
import Sidebar from '../../components/Sidebar';
import { User } from 'lucide-react';

const StudentDashboard = ({ user, onLogout, children }) => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar role="student" onLogout={onLogout} />

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
                        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Student Portal</h2>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Welcome, {user.name}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'var(--primary)',
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
                    {children}
                </div>
            </main>
        </div>
    );
};

export default StudentDashboard;
