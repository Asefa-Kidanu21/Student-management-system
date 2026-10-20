

import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

export const loginUser = async (user) => {
    const response = await axios.post(
        `${API_URL}/login`,
        user
    );

    return response.data;
};