
import React, { useState } from 'react';
import { createCourse } from '../../services/api';
import { BookOpen, AlertCircle } from 'lucide-react';

const TeacherCreateCourse = ({ user }) => {
    const [course, setCourse] = useState({
        name: '',
        dept: user.dept,
        year: '',
        sem: '',
        materials: []
    });
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCourse({
                ...course,
                instructorId: user.id
            });
            setMsg('Course created successfully!');
            setCourse({ name: '', dept: user.dept, year: '', sem: '' });
        } catch (e) {
            setMsg('Failed to create course');
        }
    };

    return (
        <div className="glass" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BookOpen /> Create New Course
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Course Name</label>
                    <input
                        type="text"
                        value={course.name}
                        onChange={(e) => setCourse({ ...course, name: e.target.value })}
                        required
                        style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'white' }}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Year (e.g., 4)</label>
                        <input
                            type="number"
                            value={course.year}
                            onChange={(e) => setCourse({ ...course, year: e.target.value })}
                            required
                            style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'white' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Semester (e.g., 7)</label>
                        <input
                            type="number"
                            value={course.sem}
                            onChange={(e) => setCourse({ ...course, sem: e.target.value })}
                            required
                            style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'white' }}
                        />
                    </div>
                </div>

                {msg && <p style={{ color: msg.includes('success') ? 'var(--accent)' : '#ef4444' }}>{msg}</p>}

                <button type="submit" style={{ padding: '1rem', background: 'var(--primary)', border: 'none', borderRadius: '12px', color: 'white', fontWeight: 'bold' }}>
                    Create Course
                </button>
            </form>

            <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255,165,0, 0.1)', borderRadius: '12px', border: '1px solid rgba(255,165,0, 0.3)' }}>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'orange', fontSize: '0.9rem' }}>
                    <AlertCircle size={16} /> Note
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                    Creating a course for Year {course.year || 'X'} and Sem {course.sem || 'Y'} will automatically make it visible to all students in {user.dept} matching that criteria.
                </p>
            </div>
        </div>
    );
};

export default TeacherCreateCourse;
