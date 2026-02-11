
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { User, Lock, ArrowRight } from 'lucide-react';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [role, setRole] = useState('student');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await loginUser(email, password, role);

            if (response && response.user) {
                onLogin(response.user);
                navigate(`/${role}`);
            } else {
                setError(response.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('Login failed. Check server connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-center" style={{ minHeight: '100vh' }}>
            <div className="glass" style={{ padding: '2.5rem', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>Welcome Back</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Login to access your dashboard</p>

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

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ position: 'relative' }}>
                        <User size={20} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                        <input
                            type="text"
                            placeholder="Email (e.g., srihariram@sc.edu)"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '1rem 1rem 1rem 3rem',
                                background: 'rgba(0,0,0,0.2)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '12px',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <Lock size={20} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '1rem 1rem 1rem 3rem',
                                background: 'rgba(0,0,0,0.2)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '12px',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                    </div>

                    {error && <p style={{ color: '#ef4444', fontSize: '0.9rem' }}>{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: '1rem',
                            background: 'linear-gradient(to right, var(--primary), var(--secondary))',
                            border: 'none',
                            borderRadius: '12px',
                            color: 'white',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Logging in...' : 'Login'} <ArrowRight size={20} />
                    </button>

                    <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        Don't have an account? <span onClick={() => navigate('/register')} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: '500' }}>Register here</span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
