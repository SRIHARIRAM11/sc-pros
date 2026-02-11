
import React from 'react';
import { User, Mail, Shield, Book, Award, Clock } from 'lucide-react';

const StudentProfile = ({ user }) => {
    return (
        <div className="glass" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' }}>
                <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    <User size={60} color="white" />
                </div>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{user.name}</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Mail size={18} /> {user.email}
                    </p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Shield size={20} /> Academic Info
                    </h3>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Department:</span>
                            <span>{user.dept}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Register No:</span>
                            <span>{user.regNo}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Year/Sem:</span>
                            <span>{user.year} / {user.sem}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Advisor:</span>
                            <span>{user.advisorId}</span>
                        </div>
                    </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={20} /> Active Status
                    </h3>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <p style={{ color: 'var(--text-secondary)' }}>Status: Active</p>
                        <p style={{ color: 'var(--text-secondary)' }}>Last Login: Today</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;
