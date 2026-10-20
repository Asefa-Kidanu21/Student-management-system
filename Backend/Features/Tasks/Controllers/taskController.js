import {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
} from "../Services/taskService.js";


// ========================================
// Get tasks
// ========================================

export const getTasks = async (req, res) => {

    try {

        const tasks = await getAllTasks();

        res.json({
            message: "Tasks retrieved successfully",
            data: tasks
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// ========================================
// ADMIN — Get all tasks
// ========================================

export const getAllTasksAsAdmin = async (req, res) => {

    try {

        const tasks = await getAllTasks();

        res.json({
            message: "All tasks retrieved successfully",
            data: tasks
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// ========================================
// Create task
// ========================================

export const createTaskController = async (req, res) => {

    try {

        const { title, description } = req.body;

        const userId = req.user.id;

        const task = await createTask(
            userId,
            title,
            description
        );

        res.status(201).json({
            message: "Task created successfully",
            data: task
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// ========================================
// Update task
// ========================================

export const updateTaskController = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            title,
            description,
            status
        } = req.body;

        const userId = req.user.id;
        const role = req.user.role;

        const task = await updateTask(
            id,
            userId,
            role,
            title,
            description,
            status
        );

        res.json({
            message: "Task updated successfully",
            data: task
        });

    } catch (error) {

        res.status(403).json({
            message: error.message
        });

    }

};


// ========================================
// Delete task
// ========================================

export const deleteTaskController = async (req, res) => {

    try {

        const { id } = req.params;

        const userId = req.user.id;
        const role = req.user.role;

        const task = await deleteTask(
            id,
            userId,
            role
        );

        res.json({
            message: "Task deleted successfully",
            data: task
        });

    } catch (error) {

        res.status(403).json({
            message: error.message
        });

    }

};