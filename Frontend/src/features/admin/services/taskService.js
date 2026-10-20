import axios from "axios";

const API_URL = "http://localhost:3000/api/tasks";


// Get all tasks — Admin
export const getTasks = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API_URL}/admin`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// Update task — Admin
export const updateTask = async (
    taskId,
    taskData
) => {

    const token = localStorage.getItem("token");

    const response = await axios.put(
        `${API_URL}/${taskId}`,
        taskData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// Delete task — Admin
export const deleteTask = async (taskId) => {

    const token = localStorage.getItem("token");

    const response = await axios.delete(
        `${API_URL}/${taskId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};