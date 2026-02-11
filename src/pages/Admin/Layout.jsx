
import React from 'react';
import Sidebar from '../../components/Sidebar';
import { User, Shield } from 'lucide-react';

// This is the LAYOUT component for Admin
const AdminDashboardLayout = ({ user, onLogout, children }) => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar role="admin" onLogout={onLogout} />

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
                        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Administrative Control</h2>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Welcome, Administrator</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: '#ef4444',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                        }}>
                            <Shield size={20} />
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

export default AdminDashboardLayout;
