
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import { User, Lock, ArrowLeft, Building, BadgeCheck } from 'lucide-react';

const Register = () => {
    const [role, setRole] = useState('student');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        dept: '',
        year: '',
        sem: '',
        regNo: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!formData.name || !formData.email || !formData.password) {
            setError('Please fill in all required fields');
            return;
        }

        try {
            const response = await registerUser({ ...formData, role });
            if (response && response.user) {
                setSuccess('Registration successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError(response.message || 'Registration failed');
            }
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="flex-center" style={{ minHeight: '100vh', padding: '2rem' }}>
            <div className="glass" style={{ padding: '2.5rem', width: '100%', maxWidth: '500px' }}>
                <button
                    onClick={() => navigate('/login')}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <ArrowLeft size={16} /> Back to Login
                </button>

                <h2 style={{ marginBottom: '0.5rem', fontSize: '2rem', textAlign: 'center' }}>Create Account</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', textAlign: 'center' }}>Join SC-PRO as a {role}</p>

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', gap: '1rem' }}>
                    {['student', 'teacher', 'admin'].map((r) => (
                        <button
                            key={r}
                            onClick={() => setRole(r)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                border: role === r ? '1px solid var(--primary)' : '1px solid var(--glass-border)',
                                background: role === r ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                                color: role === r ? 'var(--primary)' : 'var(--text-secondary)',
                                textTransform: 'capitalize'
                            }}
                        >
                            {r}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div style={{ position: 'relative' }}>
                        <User size={20} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'white', outline: 'none' }}
                            required
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <User size={20} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'white', outline: 'none' }}
                            required
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Lock size={20} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'white', outline: 'none' }}
                            required
                        />
                    </div>

                    {(role === 'student' || role === 'teacher') && (
                        <div style={{ position: 'relative' }}>
                            <Building size={20} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="text"
                                name="dept"
                                placeholder="Department (e.g., Computer Science)"
                                value={formData.dept}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'white', outline: 'none' }}
                                required
                            />
                        </div>
                    )}

                    {role === 'student' && (
                        <>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <input
                                    type="text"
                                    name="year"
                                    placeholder="Year (e.g., 3)"
                                    value={formData.year}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'white', outline: 'none' }}
                                    required
                                />
                                <input
                                    type="text"
                                    name="sem"
                                    placeholder="Sem (e.g., 5)"
                                    value={formData.sem}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'white', outline: 'none' }}
                                    required
                                />
                            </div>
                            <div style={{ position: 'relative' }}>
                                <BadgeCheck size={20} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                                <input
                                    type="text"
                                    name="regNo"
                                    placeholder="Register Number"
                                    value={formData.regNo}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'white', outline: 'none' }}
                                    required
                                />
                            </div>
                        </>
                    )}

                    {error && <p style={{ color: '#ef4444', fontSize: '0.9rem', textAlign: 'center' }}>{error}</p>}
                    {success && <p style={{ color: 'var(--accent)', fontSize: '0.9rem', textAlign: 'center' }}>{success}</p>}

                    <button
                        type="submit"
                        style={{
                            padding: '1rem',
                            background: 'linear-gradient(to right, var(--primary), var(--secondary))',
                            border: 'none',
                            borderRadius: '12px',
                            color: 'white',
                            fontWeight: '600',
                            marginTop: '1rem'
                        }}
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
