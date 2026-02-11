
import React, { useState, useEffect } from 'react';
import { getStudentMarks } from '../../services/api'; // Changed import
import { TrendingUp, FileText } from 'lucide-react';

const Marks = ({ user }) => {
    const [marks, setMarks] = useState([]);

    useEffect(() => {
        // API Call
        const fetchMarks = async () => {
            try {
                const data = await getStudentMarks(user.id);
                setMarks(data);
            } catch (e) {
                console.error("Error fetching marks:", e);
            }
        };
        fetchMarks();
    }, [user.id]);

    return (
        <div>
            <h2 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <TrendingUp /> Academic Performance
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {marks.map((m, idx) => (
                    <div key={idx} className="glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'transform 0.2s' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>{m.subject}</h3>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{m.courseId}</span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Final Exam</span>
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: m.marks >= 50 ? 'var(--accent)' : '#ef4444' }}>{m.marks}%</span>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Assignment</span>
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--secondary)' }}>{m.assignment}%</span>
                            </div>
                        </div>
                    </div>
                ))}
                {marks.length === 0 && <p className="glass" style={{ padding: '2rem' }}>No Marks available yet.</p>}
            </div>
        </div>
    );
};

export default Marks;
