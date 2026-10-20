
import axios from "axios";

const API_URL = "http://localhost:3000/api/admin";

export const getUsers = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API_URL}/users`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};