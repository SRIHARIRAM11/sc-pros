
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const loginUser = async (email, password, role) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
    });
    return response.json();
};

export const registerUser = async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    return response.json();
};

export const getUsers = async (role, dept) => {
    let query = `?role=${role}`;
    if (dept) query += `&dept=${dept}`;
    const response = await fetch(`${API_URL}/users${query}`);
    return response.json();
};

export const updateUser = async (id, userData) => {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    return response.json();
};

export const getStudentMarks = async (studentId) => {
    const response = await fetch(`${API_URL}/marks/${studentId}`);
    return response.json();
};

// Teacher - Add/Update Marks
export const updateMarks = async (data) => {
    const response = await fetch(`${API_URL}/marks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();
};

export const getLeaveRequests = async (queryParam) => {
    // queryParam can be studentId or advisorId
    const response = await fetch(`${API_URL}/leaves?${queryParam}`);
    return response.json();
};

export const submitLeaveRequest = async (requestData) => {
    const response = await fetch(`${API_URL}/leaves`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
    });
    return response.json();
};

export const updateLeaveStatus = async (id, status) => {
    const response = await fetch(`${API_URL}/leaves/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
    });
    return response.json();
};

export const getCourses = async (dept, year) => {
    const query = dept ? `?dept=${dept}&year=${year}` : '';
    const response = await fetch(`${API_URL}/courses${query}`);
    return response.json();
};

export const createCourse = async (courseData) => {
    const response = await fetch(`${API_URL}/courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData)
    });
    return response.json();
};


export const getEvents = async () => {
    const response = await fetch(`${API_URL}/events`);
    return response.json();
};

export const addEvent = async (eventData) => {
    const response = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
    });
    return response.json();
};

export const uploadData = async (formData) => {
    const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData // Content-Type is auto-set for multipart/form-data
    });
    return response.json();
};
