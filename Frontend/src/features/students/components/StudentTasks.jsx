import { useEffect, useState } from "react";

import {
    getMyTasks,
    createTask,
    updateTask,
    deleteTask
} from "../services/studentService";


function StudentTasks() {

    // ==========================
    // Tasks
    // ==========================

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    // ==========================
    // Create form
    // ==========================

    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });


    // ==========================
    // Edit
    // ==========================

    const [editingTask, setEditingTask] = useState(null);

    const [editData, setEditData] = useState({
        title: "",
        description: "",
        status: ""
    });


    // ==========================
    // Get student's tasks
    // ==========================

    const fetchTasks = async () => {

        try {

            setError("");

            const result = await getMyTasks();

            console.log("My tasks:", result);

            setTasks(result.data);

        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Failed to load tasks."
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        fetchTasks();

    }, []);


    // ==========================
    // Create input
    // ==========================

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    // ==========================
    // Create task
    // ==========================

    const handleCreateTask = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        try {

            const result = await createTask(formData);

            console.log("Created task:", result);

            // Add new task to beginning
            setTasks([
                result.data,
                ...tasks
            ]);

            // Clear form
            setFormData({
                title: "",
                description: ""
            });

            // Hide form
            setShowForm(false);

            setSuccess(
                "Task created successfully."
            );

        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Failed to create task."
            );

        }

    };


    // ==========================
    // Start editing
    // ==========================

    const handleEdit = (task) => {

        setEditingTask(task);

        setEditData({
            title: task.title,
            description: task.description,
            status: task.status
        });

        setError("");
        setSuccess("");

    };


    // ==========================
    // Edit input
    // ==========================

    const handleEditChange = (e) => {

        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        });

    };


    // ==========================
    // Update task
    // ==========================

    const handleUpdate = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        try {

            const result = await updateTask(
                editingTask.id,
                editData
            );

            console.log("Updated task:", result);

            setTasks(
                tasks.map((task) =>
                    task.id === editingTask.id
                        ? result.data
                        : task
                )
            );

            setEditingTask(null);

            setSuccess(
                "Task updated successfully."
            );

        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Failed to update task."
            );

        }

    };


    // ==========================
    // Delete task
    // ==========================

    const handleDelete = async (taskId) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmed) {
            return;
        }

        setError("");
        setSuccess("");

        try {

            await deleteTask(taskId);

            setTasks(
                tasks.filter(
                    (task) => task.id !== taskId
                )
            );

            setSuccess(
                "Task deleted successfully."
            );

        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Failed to delete task."
            );

        }

    };


    // ==========================
    // Loading
    // ==========================

    if (loading) {

        return (

            <div className="flex justify-center items-center py-16">

                <div className="text-center">

                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto">
                    </div>

                    <p className="text-slate-600 mt-4">
                        Loading your tasks...
                    </p>

                </div>

            </div>

        );

    }


    return (

        <div>

            {/* ==========================
                Header
            ========================== */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                <div>

                    <h2 className="text-3xl font-bold text-slate-800">
                        My Tasks
                    </h2>

                    <p className="text-slate-500 mt-1">
                        Create and manage your tasks
                    </p>

                </div>


                <button
                    onClick={() => {

                        setShowForm(!showForm);

                        setEditingTask(null);

                        setError("");
                        setSuccess("");

                    }}
                    className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                >

                    {showForm
                        ? "Cancel"
                        : "+ Create Task"
                    }

                </button>

            </div>


            {/* ==========================
                Error
            ========================== */}

            {error && (

                <div className="mb-5 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">

                    {error}

                </div>

            )}


            {/* ==========================
                Success
            ========================== */}

            {success && (

                <div className="mb-5 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg">

                    {success}

                </div>

            )}


            {/* ==========================
                Create Task Form
            ========================== */}

            {showForm && (

                <div className="bg-white rounded-xl shadow p-6 mb-6">

                    <h3 className="text-xl font-bold text-slate-800 mb-5">
                        Create New Task
                    </h3>


                    <form
                        onSubmit={handleCreateTask}
                        className="space-y-5"
                    >

                        {/* Title */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Task Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter task title"
                                required
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>


                        {/* Description */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter task description"
                                rows="4"
                                required
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>


                        {/* Submit */}

                        <button
                            type="submit"
                            className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition font-medium"
                        >
                            Create Task
                        </button>

                    </form>

                </div>

            )}


            {/* ==========================
                Edit Task Form
            ========================== */}

            {editingTask && (

                <div className="bg-white rounded-xl shadow p-6 mb-6">

                    <div className="flex justify-between items-center mb-5">

                        <h3 className="text-xl font-bold text-slate-800">
                            Edit Task
                        </h3>

                        <button
                            type="button"
                            onClick={() => setEditingTask(null)}
                            className="text-slate-500 hover:text-red-600 text-xl"
                        >
                            ✕
                        </button>

                    </div>


                    <form
                        onSubmit={handleUpdate}
                        className="space-y-5"
                    >

                        {/* Title */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Task Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={editData.title}
                                onChange={handleEditChange}
                                required
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>


                        {/* Description */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={editData.description}
                                onChange={handleEditChange}
                                rows="4"
                                required
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>


                        {/* Status */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Status
                            </label>

                            <select
                                name="status"
                                value={editData.status}
                                onChange={handleEditChange}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >

                                <option value="pending">
                                    Pending
                                </option>

                                <option value="in_progress">
                                    In Progress
                                </option>

                                <option value="completed">
                                    Completed
                                </option>

                            </select>

                        </div>


                        {/* Buttons */}

                        <div className="flex gap-3">

                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                            >
                                Update Task
                            </button>

                            <button
                                type="button"
                                onClick={() => setEditingTask(null)}
                                className="bg-slate-200 text-slate-700 px-5 py-3 rounded-lg hover:bg-slate-300 transition font-medium"
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* ==========================
                Task Cards
            ========================== */}

            {tasks.length > 0 ? (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {tasks.map((task) => (

                        <div
                            key={task.id}
                            className="bg-white rounded-xl shadow hover:shadow-lg transition p-6"
                        >

                            {/* Task title */}

                            <div className="flex justify-between items-start gap-3">

                                <h3 className="text-xl font-bold text-slate-800">
                                    {task.title}
                                </h3>

                                <span className="text-xs text-slate-400">
                                    #{task.id}
                                </span>

                            </div>


                            {/* Description */}

                            <p className="text-slate-600 mt-3 min-h-5">
                                {task.description}
                            </p>


                            {/* Status */}

                            <div className="mt-4">

                                <span
                                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                        task.status === "completed"
                                            ? "bg-green-100 text-green-700"
                                            : task.status === "in_progress"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-slate-100 text-slate-700"
                                    }`}
                                >
                                    {task.status}
                                </span>

                            </div>


                            {/* Date */}

                            <p className="text-sm text-slate-400 mt-4">

                                Created:{" "}

                                {new Date(
                                    task.created_at
                                ).toLocaleDateString()}

                            </p>


                            {/* Buttons */}

                            <div className="flex gap-3 mt-5">

                                <button
                                    onClick={() =>
                                        handleEdit(task)
                                    }
                                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Edit
                                </button>


                                <button
                                    onClick={() =>
                                        handleDelete(task.id)
                                    }
                                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            ) : (

                /* ==========================
                   No Tasks
                ========================== */

                <div className="bg-white rounded-xl shadow p-10 text-center">

                    <div className="text-5xl mb-4">
                        📋
                    </div>

                    <h3 className="text-xl font-bold text-slate-800">
                        No Tasks Yet
                    </h3>

                    <p className="text-slate-500 mt-2">
                        Create your first task to get started.
                    </p>

                    <button
                        onClick={() => setShowForm(true)}
                        className="mt-5 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        + Create Your First Task
                    </button>

                </div>

            )}

        </div>

    );
}

export default StudentTasks;