
import React, { useState } from 'react';
import { uploadData } from '../../services/api';
import { Upload, FileText, CheckCircle, AlertOctagon } from 'lucide-react';

const TeacherUpload = ({ user }) => {
    const [file, setFile] = useState(null);
    const [msg, setMsg] = useState({ text: '', type: '' });
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMsg({ text: 'Please select a file first.', type: 'error' });
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        setMsg({ text: '', type: '' });

        try {
            const result = await uploadData(formData);
            if (result.message) {
                setMsg({ text: `${result.message} (${result.count || 0} records processed)`, type: 'success' });
            } else {
                setMsg({ text: 'Upload failed.', type: 'error' });
            }
        } catch (error) {
            setMsg({ text: 'Server error during upload.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Upload /> Bulk Data Upload
            </h2>

            <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                Upload CSV files to bulk create <strong>Users</strong>, <strong>Courses</strong>, or <strong>Marks</strong>. The system will automatically detect the data type based on headers.
            </p>

            <div style={{
                border: '2px dashed var(--glass-border)',
                borderRadius: '12px',
                padding: '2rem',
                textAlign: 'center',
                background: 'rgba(0,0,0,0.2)',
                marginBottom: '1.5rem'
            }}>
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="file-upload"
                />
                <label htmlFor="file-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <FileText size={48} color="var(--primary)" />
                    <span style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                        {file ? file.name : "Click to select CSV file"}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Supported: .csv</span>
                </label>
            </div>

            {msg.text && (
                <div style={{
                    padding: '1rem',
                    borderRadius: '8px',
                    background: msg.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: msg.type === 'success' ? 'var(--accent)' : '#ef4444',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    {msg.type === 'success' ? <CheckCircle size={20} /> : <AlertOctagon size={20} />}
                    {msg.text}
                </div>
            )}

            <button
                onClick={handleUpload}
                disabled={loading}
                style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'var(--primary)',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    fontWeight: 'bold',
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? 'wait' : 'pointer'
                }}
            >
                {loading ? 'Analyzing & Uploading...' : 'Upload & Process'}
            </button>

            <div style={{ marginTop: '2rem' }}>
                <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Supported Headers:</h4>
                <ul style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', paddingLeft: '1.2rem', lineHeight: '1.6' }}>
                    <li><strong>Users:</strong> name, email, role, dept...</li>
                    <li><strong>Courses:</strong> courseName, dept, year...</li>
                    <li><strong>Marks:</strong> studentId, courseId, marks...</li>
                </ul>
            </div>
        </div>
    );
};

export default TeacherUpload;
