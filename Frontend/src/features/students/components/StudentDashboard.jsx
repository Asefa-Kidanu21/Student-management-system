import { useState } from "react";
import StudentProfile from "./StudentProfile";
import StudentTasks from "./StudentTasks";

function StudentDashboard() {

    const [activePage, setActivePage] = useState("dashboard");

    return (
        <div className="min-h-screen bg-slate-100 flex">

            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">

                <h1 className="text-2xl font-bold mb-8">
                    Student Dashboard
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


                    {/* My Profile */}
                    <button
                        onClick={() => setActivePage("profile")}
                        className={`w-full text-left px-4 py-3 rounded-lg transition ${
                            activePage === "profile"
                                ? "bg-slate-700"
                                : "hover:bg-slate-700"
                        }`}
                    >
                        My Profile
                    </button>


                    {/* My Tasks */}
                    <button
                        onClick={() => setActivePage("tasks")}
                        className={`w-full text-left px-4 py-3 rounded-lg transition ${
                            activePage === "tasks"
                                ? "bg-slate-700"
                                : "hover:bg-slate-700"
                        }`}
                    >
                        My Tasks
                    </button>


                    {/* Logout */}
                    <button
                        onClick={() => {

                            localStorage.removeItem("token");
                            localStorage.removeItem("user");

                            window.location.href = "/login/student";

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
                            Welcome to your Student Dashboard.
                        </p>

                    </div>

                )}


                {/* Profile */}
                {activePage === "profile" && (
                    <StudentProfile />
                )}


                {/* Tasks */}
                {activePage === "tasks" && (
    <StudentTasks />
)}
            </main>

        </div>
    );
}

export default StudentDashboard;