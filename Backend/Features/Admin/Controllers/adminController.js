


import {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser

 } from "../Services/adminService.js";

export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();

        res.json({
            message: "Users retrieved successfully",
            data: users
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


export const createUserController = async (req, res) => {
    try {

        const { name, email, password, role } = req.body;

        const user = await createUser(
            name,
            email,
            password,
            role
        );

        res.status(201).json({
            message: "User created successfully",
            data: user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

export const updateUserController = async (req, res) => {
    try {

        const { id } = req.params;

        const { name, email, role } = req.body;

        const user = await updateUser(
            id,
            name,
            email,
            role
        );

        res.json({
            message: "User updated successfully",
            data: user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


export const deleteUserController = async (req, res) => {
    try {

        const { id } = req.params;

        const user = await deleteUser(id);

        res.json({
            message: "User deleted successfully",
            data: user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};