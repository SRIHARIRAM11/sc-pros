
import React, { useState, useEffect } from 'react';
import { getCourses } from '../../services/api';
import { BookOpen, FileText, Download } from 'lucide-react';

const Courses = ({ user }) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getCourses(user.dept, user.year);
                setCourses(data);
            } catch (e) {
                console.error("Error fetching courses", e);
            }
        };
        fetchCourses();
    }, [user.dept, user.year]);

    return (
        <div>
            <h2 style={{ marginBottom: '2rem' }}>Enrolled Courses</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {courses.map((course) => (
                    <div key={course.id} className="glass" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <BookOpen size={24} /> {course.name}
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Instructor: {course.instructorId}</p>

                        <h4 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Materials</h4>
                        {course.materials && course.materials.length > 0 ? (
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {course.materials.map((mat) => (
                                    <li key={mat.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <FileText size={16} color="var(--secondary)" />
                                            <span style={{ fontSize: '0.9rem' }}>{mat.title}</span>
                                        </div>
                                        <a href={mat.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem' }}>
                                            <Download size={14} /> Download
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>No materials uploaded.</p>
                        )}
                    </div>
                ))}
                {courses.length === 0 && <p className="glass" style={{ padding: '2rem' }}>No courses found for your department/year.</p>}
            </div>
        </div>
    );
};

export default Courses;
