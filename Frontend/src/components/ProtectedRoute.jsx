


import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    // No token → go to login
    if (!token) {
        return <Navigate to="/login/admin" replace />;
    }

    // Wrong role → deny access
    if (user?.role !== allowedRole) {

        if (user?.role === "student") {
            return <Navigate to="/student/dashboard" replace />;
        }

        if (user?.role === "admin") {
            return <Navigate to="/admin/dashboard" replace />;
        }

        return <Navigate to="/login/admin" replace />;
    }

    // Correct role → allow dashboard
    return children;
}

export default ProtectedRoute;