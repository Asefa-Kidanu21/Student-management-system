import { useState } from "react";
import AdminUsers from "./AdminUsers";
import AdminTasks from "./AdminTasks";

function AdminDashboard() {

    const [activePage, setActivePage] = useState("dashboard");

    return (
        <div className="min-h-screen bg-slate-100 flex">

            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">

                <h1 className="text-2xl font-bold mb-8">
                    Admin Dashboard
                </h1>

                <nav className="space-y-2">

                    {/* Dashboard */}
                    <button
                        onClick={() => setActivePage("dashboard")}
                        className={`w-full text-left px-4 py-3 rounded-lg transition ${
                            activePage === "dashboard"
                                ? "bg-slate-700"
                                : "hover:bg-slate-700"
                        }`}
                    >
                        Dashboard
                    </button>

                    {/* Users */}
                    <button
                        onClick={() => setActivePage("users")}
                        className={`w-full text-left px-4 py-3 rounded-lg transition ${
                            activePage === "users"
                                ? "bg-slate-700"
                                : "hover:bg-slate-700"
                        }`}
                    >
                        Users
                    </button>

                    {/* Tasks */}
                    <button
                        onClick={() => setActivePage("tasks")}
                        className={`w-full text-left px-4 py-3 rounded-lg transition ${
                            activePage === "tasks"
                                ? "bg-slate-700"
                                : "hover:bg-slate-700"
                        }`}
                    >
                        Tasks
                    </button>

                    {/* Logout */}
                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");

                            window.location.href = "/login/admin";
                        }}
                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-600 transition"
                    >
                        Logout
                    </button>

                </nav>

            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">

                {/* Dashboard */}
                {activePage === "dashboard" && (
                    <div>

                        <h2 className="text-3xl font-bold text-slate-800">
                            Dashboard
                        </h2>

                        <p className="mt-3 text-slate-600">
                            Welcome to the Admin Dashboard.
                        </p>

                    </div>
                )}

                {/* Users */}
                {activePage === "users" && (
                    <AdminUsers />
                )}

                {/* Tasks */}
                {activePage === "tasks" && (
                    <AdminTasks />
                )}

            </main>

        </div>
    );
}

export default AdminDashboard;