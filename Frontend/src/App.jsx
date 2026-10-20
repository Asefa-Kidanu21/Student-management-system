import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentRegister from "./features/students/components/StudentRegister";
import AdminLogin from "./features/auth/components/AdminLogin";
import StudentLogin from "./features/auth/components/StudentLogin";

import AdminDashboard from "./features/admin/components/AdminDashboard";
import StudentDashboard from "./features/students/components/StudentDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                {/* Admin Login */}
                <Route
                    path="/login/admin"
                    element={<AdminLogin />}
                />

                {/* Student Login */}
                <Route
                    path="/login/student"
                    element={<StudentLogin />}
                />

                {/* Admin Dashboard */}
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Student Dashboard */}
                <Route
                    path="/student/dashboard"
                    element={
                        <ProtectedRoute allowedRole="student">
                            <StudentDashboard />
                        </ProtectedRoute>
                    }
                />


                <Route
                      path="/register/student"
                        element={<StudentRegister />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;