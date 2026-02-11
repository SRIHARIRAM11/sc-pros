
import React, { useState, useEffect } from 'react';
import { getUsers } from '../../services/api';
import { Search } from 'lucide-react';

const TeacherStudents = ({ user }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Fetch students in department
        const fetchStudents = async () => {
            try {
                const data = await getUsers('student', user.dept);
                setStudents(data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchStudents();
    }, [user.dept]);

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.regNo && s.regNo.includes(searchTerm))
    );

    return (
        <div>
            <h2 style={{ marginBottom: '2rem' }}>Department Students ({user.dept})</h2>

            <div style={{ marginBottom: '2rem', position: 'relative', width: '300px' }}>
                <Search size={20} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input
                    type="text"
                    placeholder="Search Name or Reg No..."
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
                            <th style={{ padding: '1rem' }}>Name</th>
                            <th style={{ padding: '1rem' }}>Register No</th>
                            <th style={{ padding: '1rem' }}>Year/Sem</th>
                            <th style={{ padding: '1rem' }}>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map((s, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                <td style={{ padding: '1rem' }}>{s.name}</td>
                                <td style={{ padding: '1rem' }}>{s.regNo}</td>
                                <td style={{ padding: '1rem' }}>{s.year} / {s.sem}</td>
                                <td style={{ padding: '1rem' }}>{s.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredStudents.length === 0 && <p style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No students found.</p>}
            </div>
        </div>
    );
};

export default TeacherStudents;
