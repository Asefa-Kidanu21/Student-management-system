import { useEffect, useState } from "react";
import {
    getTasks,
    updateTask,
    deleteTask
} from "../services/taskService";

function AdminTasks() {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editingTask, setEditingTask] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: ""
    });


    // ==============================
    // Get all tasks
    // ==============================

    const fetchTasks = async () => {

        try {

            const result = await getTasks();

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


    // ==============================
    // Start editing
    // ==============================

    const handleEdit = (task) => {

        setEditingTask(task);

        setFormData({
            title: task.title,
            description: task.description,
            status: task.status
        });
    };


    // ==============================
    // Input changes
    // ==============================

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    // ==============================
    // Update task
    // ==============================

    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            await updateTask(
                editingTask.id,
                formData
            );

            // Close edit form
            setEditingTask(null);

            // Reload tasks
            await fetchTasks();

        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Failed to update task."
            );
        }
    };


    // ==============================
    // Delete task
    // ==============================

    const handleDelete = async (taskId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteTask(taskId);

            // Remove task from screen
            setTasks(
                tasks.filter(
                    (task) => task.id !== taskId
                )
            );

        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Failed to delete task."
            );
        }
    };


    // ==============================
    // Loading
    // ==============================

    if (loading) {

        return (
            <div className="flex justify-center py-10">

                <p className="text-slate-600">
                    Loading tasks...
                </p>

            </div>
        );
    }


    return (
        <div>

            {/* Header */}

            <div className="mb-6">

                <h2 className="text-3xl font-bold text-slate-800">
                    All Tasks
                </h2>

                <p className="text-slate-500 mt-1">
                    View and manage all user tasks
                </p>

            </div>


            {/* Error */}

            {error && (

                <div className="mb-5 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">

                    {error}

                </div>

            )}


            {/* Edit Form */}

            {editingTask && (

                <div className="bg-white rounded-xl shadow p-6 mb-6">

                    <div className="flex justify-between items-center mb-5">

                        <h3 className="text-xl font-bold text-slate-800">
                            Edit Task
                        </h3>

                        <button
                            onClick={() => setEditingTask(null)}
                            className="text-slate-500 hover:text-red-600"
                        >
                            ✕
                        </button>

                    </div>


                    <form onSubmit={handleUpdate}>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                            {/* Title */}

                            <div>

                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />

                            </div>


                            {/* Status */}

                            <div>

                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Status
                                </label>

                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                        </div>


                        {/* Description */}

                        <div className="mt-4">

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                        </div>


                        {/* Buttons */}

                        <div className="flex gap-3 mt-5">

                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition"
                            >
                                Update Task
                            </button>

                            <button
                                type="button"
                                onClick={() => setEditingTask(null)}
                                className="bg-slate-200 text-slate-700 px-5 py-2.5 rounded-lg hover:bg-slate-300 transition"
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* Tasks Table */}

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-slate-800 text-white">

                            <tr>

                                <th className="px-6 py-4 text-left">
                                    ID
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Title
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Description
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-left">
                                    User
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Email
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Created
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {tasks.map((task) => (

                                <tr
                                    key={task.id}
                                    className="border-b hover:bg-slate-50"
                                >

                                    <td className="px-6 py-4">
                                        {task.id}
                                    </td>

                                    <td className="px-6 py-4 font-medium text-slate-800">
                                        {task.title}
                                    </td>

                                    <td className="px-6 py-4 text-slate-600">
                                        {task.description}
                                    </td>

                                    <td className="px-6 py-4">

                                        <span className="px-3 py-1 rounded-full text-sm bg-slate-100 text-slate-700">
                                            {task.status}
                                        </span>

                                    </td>

                                    <td className="px-6 py-4">
                                        {task.user_name}
                                    </td>

                                    <td className="px-6 py-4 text-slate-600">
                                        {task.user_email}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {new Date(
                                            task.created_at
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="px-6 py-4">

                                        <div className="flex gap-2">

                                            <button
                                                onClick={() =>
                                                    handleEdit(task)
                                                }
                                                className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(task.id)
                                                }
                                                className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>


                {tasks.length === 0 && (

                    <p className="text-center py-8 text-slate-500">
                        No tasks found.
                    </p>

                )}

            </div>

        </div>
    );
}

export default AdminTasks;