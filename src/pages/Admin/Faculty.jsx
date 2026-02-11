
import React, { useState, useEffect } from 'react';
import { getUsers } from '../../services/api';
import { Search, Mail, User } from 'lucide-react';

const AdminFaculty = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [faculty, setFaculty] = useState([]);

    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const data = await getUsers('teacher');
                setFaculty(data);
            } catch (e) {
                console.error('Failed to fetch faculty');
            }
        };
        fetchFaculty();
    }, []);

    const filteredFaculty = faculty.filter(f =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (f.dept && f.dept.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div>
            <h2 style={{ marginBottom: '2rem' }}>All Faculty Members</h2>

            <div style={{ marginBottom: '2rem', position: 'relative', width: '300px' }}>
                <Search size={20} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input
                    type="text"
                    placeholder="Search Faculty Name of Dept..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '1rem 1rem 1rem 3rem',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '12px',
                        color: 'white',
                        outline: 'none'
                    }}
                />
            </div>

            <div className="glass" style={{ padding: '1rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-primary)' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
                            <th style={{ padding: '1rem' }}>Faculty</th>
                            <th style={{ padding: '1rem' }}>Department</th>
                            <th style={{ padding: '1rem' }}>Email</th>
                            <th style={{ padding: '1rem' }}>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFaculty.map((f, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                    <div style={{ width: '30px', height: '30px', background: 'var(--secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <User size={16} color="white" />
                                    </div>
                                    {f.name}
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{ background: 'rgba(236, 72, 153, 0.1)', color: 'var(--secondary)', padding: '0.2rem 0.6rem', borderRadius: '8px', fontSize: '0.8rem' }}>
                                        {f.dept || 'N/A'}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>{f.email}</td>
                                <td style={{ padding: '1rem' }}>{f.phone || '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredFaculty.length === 0 && <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No faculty members found.</p>}
            </div>
        </div>
    );
};

export default AdminFaculty;
