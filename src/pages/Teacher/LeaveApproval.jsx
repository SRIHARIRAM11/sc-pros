
import React, { useState, useEffect } from 'react';
import { getLeaveRequests, updateLeaveStatus } from '../../services/api';
import { Check, X, Clock } from 'lucide-react';

const TeacherLeaveApproval = ({ user }) => {
    const [requests, setRequests] = useState([]);

    const fetchLeaves = async () => {
        try {
            const data = await getLeaveRequests(`advisorId=${user.id}`);
            setRequests(data);
        } catch (e) {
            console.error("Error fetching leave requests", e);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, [user.id]);

    const handleAction = async (id, status) => {
        try {
            await updateLeaveStatus(id, status);
            fetchLeaves(); // Refresh
        } catch (e) {
            alert("Failed to update status");
        }
    };

    return (
        <div>
            <h2 style={{ marginBottom: '2rem' }}>Leave Requests (Advisor View)</h2>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {requests.length === 0 ? <p className="glass" style={{ padding: '2rem' }}>No pending requests found for you.</p> : null}

                {requests.map((req) => (
                    <div key={req.id} className="glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>{req.studentName}</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{req.date}</p>
                            <p style={{ fontStyle: 'italic' }}>"{req.reason}"</p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{
                                padding: '0.3rem 0.8rem',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                border: `1px solid ${req.status === 'Pending' ? 'var(--text-secondary)' :
                                        req.status === 'Approved' ? 'var(--accent)' : '#ef4444'
                                    }`,
                                color: req.status === 'Pending' ? 'var(--text-secondary)' :
                                    req.status === 'Approved' ? 'var(--accent)' : '#ef4444'
                            }}>
                                {req.status}
                            </span>

                            {req.status === 'Pending' && (
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        onClick={() => handleAction(req.id, 'Approved')}
                                        style={{ background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        title="Approve"
                                    >
                                        <Check size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleAction(req.id, 'Rejected')}
                                        style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        title="Reject"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeacherLeaveApproval;
