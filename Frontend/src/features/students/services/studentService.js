import axios from "axios";

const API_URL = "http://localhost:3000/api";


// ======================================
// Student Registration
// ======================================

export const registerStudent = async (studentData) => {

    const response = await axios.post(
        `${API_URL}/auth/register`,
        studentData
    );

    return response.data;
};


// ======================================
// Get My Profile
// ======================================

export const getMyProfile = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API_URL}/students/profile`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// ======================================
// Get My Tasks
// ======================================

export const getMyTasks = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API_URL}/tasks`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// ======================================
// Create Task
// ======================================

export const createTask = async (taskData) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        `${API_URL}/tasks`,
        taskData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// ======================================
// Update Task
// ======================================

export const updateTask = async (
    taskId,
    taskData
) => {

    const token = localStorage.getItem("token");

    const response = await axios.put(
        `${API_URL}/tasks/${taskId}`,
        taskData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// ======================================
// Delete Task
// ======================================

export const deleteTask = async (taskId) => {

    const token = localStorage.getItem("token");

    const response = await axios.delete(
        `${API_URL}/tasks/${taskId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};