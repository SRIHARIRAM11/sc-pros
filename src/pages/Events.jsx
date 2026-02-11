
import React, { useState, useEffect } from 'react';
import { getEvents, addEvent } from '../services/api';
import { Calendar, MapPin, Clock, PlusCircle } from 'lucide-react';

const Events = ({ user }) => {
    const [events, setEvents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        date: '',
        location: ''
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const data = await getEvents();
            setEvents(data);
        } catch (err) {
            console.error('Failed to fetch events');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addEvent(newEvent);
            setShowForm(false);
            setNewEvent({ title: '', description: '', date: '', location: '' });
            fetchEvents();
        } catch (err) {
            alert('Failed to add event');
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Calendar /> Events & Announcements
                </h2>
                {user.role === 'teacher' && (
                    <button
                        onClick={() => setShowForm(!showForm)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.8rem 1.2rem',
                            background: 'var(--accent)',
                            border: 'none',
                            borderRadius: '12px',
                            color: 'white',
                            fontWeight: '600'
                        }}
                    >
                        <PlusCircle size={20} /> Add Event
                    </button>
                )}
            </div>

            {showForm && (
                <div className="glass" style={{ padding: '2rem', marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Create New Event</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                        <input
                            type="text"
                            placeholder="Event Title"
                            value={newEvent.title}
                            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                            required
                            style={{ width: '100%', padding: '1rem', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'white', outline: 'none' }}
                        />
                        <textarea
                            placeholder="Description"
                            value={newEvent.description}
                            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                            required
                            rows="3"
                            style={{ width: '100%', padding: '1rem', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'white', outline: 'none' }}
                        />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <input
                                type="date"
                                value={newEvent.date}
                                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                                required
                                style={{ width: '100%', padding: '1rem', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'white', outline: 'none' }}
                            />
                            <input
                                type="text"
                                placeholder="Location"
                                value={newEvent.location}
                                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                                required
                                style={{ width: '100%', padding: '1rem', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'white', outline: 'none' }}
                            />
                        </div>
                        <button
                            type="submit"
                            style={{
                                marginTop: '1rem',
                                padding: '1rem',
                                background: 'linear-gradient(to right, var(--primary), var(--secondary))',
                                border: 'none',
                                borderRadius: '12px',
                                color: 'white',
                                fontWeight: '600'
                            }}
                        >
                            Post Event
                        </button>
                    </form>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {events.map((event) => (
                    <div key={event.id} className="glass" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary)' }}>{event.title}</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{event.description}</p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <Clock size={16} color="var(--accent)" />
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{event.date}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <MapPin size={16} color="var(--secondary)" />
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{event.location}</span>
                        </div>
                    </div>
                ))}
                {events.length === 0 && <p className="glass" style={{ padding: '2rem' }}>No events scheduled.</p>}
            </div>
        </div>
    );
};

export default Events;
