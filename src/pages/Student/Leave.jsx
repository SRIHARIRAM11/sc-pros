
import React, { useState, useEffect } from 'react';
import { getLeaveRequests, submitLeaveRequest } from '../../services/api'; // API Imports
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const Leave = ({ user }) => {
    const [requests, setRequests] = useState([]);
    const [reason, setReason] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // Fetch Requests
    const fetchLeaves = async () => {
        try {
            const data = await getLeaveRequests(`studentId=${user.id}`);
            setRequests(data);
        } catch (e) {
            console.error("Error fetching leaves", e);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, [user.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // Find advisor logic: For now we default to user.advisorId or T001 if missing (mock fallback)
            // In real app, advisorId should be assigned
            const advisorId = user.advisorId || "T001";

            await submitLeaveRequest({
                studentId: user.id,
                studentName: user.name,
                advisorId: advisorId,
                reason: reason,
                date: new Date().toISOString().split('T')[0]
            });
            setReason('');
            fetchLeaves(); // Refresh list
        } catch (e) {
            console.error("Error submitting leave", e);
            alert("Failed to submit leave request");
        } finally {
            setSubmitting(false);
        }
    };

    const statusColor = (status) => {
        switch (status) {
            case 'Approved': return 'var(--accent)';
            case 'Rejected': return '#ef4444';
            default: return 'var(--text-secondary)';
        }
    };

    const StatusIcon = ({ status }) => {
        switch (status) {
            case 'Approved': return <CheckCircle size={20} color="var(--accent)" />;
            case 'Rejected': return <XCircle size={20} color="#ef4444" />;
            default: return <Clock size={20} color="var(--text-secondary)" />;
        }
    };

    return (
        <div>
            <h2 style={{ marginBottom: '2rem' }}>Leave Application</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="glass" style={{ padding: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Submit Request</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Reason</label>
                            <textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                rows="4"
                                required
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'rgba(0,0,0,0.2)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '12px',
                                    color: 'white',
                                    outline: 'none',
                                    resize: 'none'
                                }}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={submitting}
                            style={{
                                padding: '1rem',
                                background: 'var(--primary)',
                                border: 'none',
                                borderRadius: '12px',
                                color: 'white',
                                fontWeight: '600',
                                opacity: submitting ? 0.7 : 1
                            }}
                        >
                            {submitting ? 'Submitting...' : 'Send Request'}
                        </button>
                    </form>
                </div>

                <div className="glass" style={{ padding: '2rem', maxHeight: '500px', overflowY: 'auto' }}>
                    <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>History</h3>
                    {requests.length === 0 ? (
                        <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No leave requests found.</p>
                    ) : (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {requests.slice().reverse().map((req, idx) => (
                                <li key={idx} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '1rem',
                                    borderBottom: idx !== requests.length - 1 ? '1px solid var(--glass-border)' : 'none'
                                }}>
                                    <div>
                                        <h4 style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>{req.reason}</h4>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{req.date}</span>
                                        {/* Add advisor info if possible, simple text for now */}
                                        <div style={{ fontSize: '0.7rem', color: 'gray' }}>Advisor ID: {req.advisorId}</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ fontSize: '0.9rem', color: statusColor(req.status), fontWeight: '500' }}>{req.status}</span>
                                        <StatusIcon status={req.status} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Leave;
