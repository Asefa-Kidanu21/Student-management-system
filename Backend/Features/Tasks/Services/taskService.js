import {
    getAllTasksModel,
    createTaskModel,
    updateTaskModel,
    updateTaskAsAdminModel,
    deleteTaskModel,
    deleteTaskAsAdminModel
} from "../Models/taskModel.js";


// Get all tasks
export const getAllTasks = async () => {

    const tasks = await getAllTasksModel();

    return tasks;
};


// Create task
export const createTask = async (
    userId,
    title,
    description
) => {

    const task = await createTaskModel(
        userId,
        title,
        description
    );

    return task;
};


// Update task
export const updateTask = async (
    taskId,
    userId,
    role,
    title,
    description,
    status
) => {

    // Admin can update any task
    if (role === "admin") {

        return await updateTaskAsAdminModel(
            taskId,
            title,
            description,
            status
        );

    }

    // Student can update only their own task
    return await updateTaskModel(
        taskId,
        userId,
        title,
        description,
        status
    );
};


// Delete task
export const deleteTask = async (
    taskId,
    userId,
    role
) => {

    // Admin can delete any task
    if (role === "admin") {

        return await deleteTaskAsAdminModel(
            taskId
        );

    }

    // Student can delete only their own task
    return await deleteTaskModel(
        taskId,
        userId
    );
};