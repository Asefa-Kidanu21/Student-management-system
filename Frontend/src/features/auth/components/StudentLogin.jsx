import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function StudentLogin() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        try {

            const result = await loginUser(user);

            // Check if the account is a student
            if (result.data.role !== "student") {
                setError("This account is not a student account.");
                return;
            }

            // Save JWT token
            localStorage.setItem(
                "token",
                result.data.token
            );

            // Save user information
            localStorage.setItem(
                "user",
                JSON.stringify(result.data)
            );

            // Go to Student Dashboard
            navigate("/student/dashboard");

        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Login failed. Please check your email and password."
            );
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl"
            >

                {/* Title */}
                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold text-slate-800">
                        Student Login
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Login to your student account
                    </p>

                </div>

                {/* Error */}
                {error && (
                    <div className="mb-5 rounded-lg bg-red-100 border border-red-300 text-red-700 px-4 py-3">
                        {error}
                    </div>
                )}

                {/* Email */}
                <div className="mb-5">

                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter student email"
                        value={user.email}
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-lg px-4 py-3
                                   focus:outline-none focus:ring-2 focus:ring-green-500
                                   focus:border-green-500"
                        required
                    />

                </div>

                {/* Password */}
                <div className="mb-6">

                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={user.password}
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-lg px-4 py-3
                                   focus:outline-none focus:ring-2 focus:ring-green-500
                                   focus:border-green-500"
                        required
                    />

                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-lg
                               font-semibold hover:bg-green-700
                               transition duration-200"
                >
                    Login
                </button>

            </form>

        </div>
    );
}

export default StudentLogin;