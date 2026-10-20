

import {
     registerUser,
     loginUser
    } from "../Services/authService.js";

export const register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const user = await registerUser(
            name,
            email,
            password
        );

        res.status(201).json({
            message: "User registered successfully",
            user: user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

export const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const result = await loginUser(
            email,
            password
        );

        res.json({
            message: "Login successful",
            data: result
        });

    } catch (error) {

        res.status(401).json({
            message: error.message
        });

    }
};