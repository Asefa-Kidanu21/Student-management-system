import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerStudent } from "../services/studentService";

function StudentRegister() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);


    // ==========================
    // Handle input changes
    // ==========================

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    // ==========================
    // Submit registration
    // ==========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");


        // Check password
        if (formData.password !== formData.confirmPassword) {

            setError("Passwords do not match.");
            return;

        }


        try {

            setLoading(true);

            await registerStudent({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });


            setSuccess(
                "Registration successful! Redirecting to login..."
            );


            // Go to student login
            setTimeout(() => {

                navigate("/login/student");

            }, 1500);


        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Registration failed."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-md">

                {/* Card */}

                <div className="bg-white rounded-2xl shadow-xl p-8">


                    {/* Header */}

                    <div className="text-center mb-8">

                        <h1 className="text-3xl font-bold text-slate-800">
                            Student Registration
                        </h1>

                        <p className="text-slate-500 mt-2">
                            Create your student account
                        </p>

                    </div>


                    {/* Error */}

                    {error && (

                        <div className="mb-5 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>

                    )}


                    {/* Success */}

                    {success && (

                        <div className="mb-5 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg text-sm">
                            {success}
                        </div>

                    )}


                    {/* Form */}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >


                        {/* Name */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />

                        </div>


                        {/* Email */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />

                        </div>


                        {/* Password */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />

                        </div>


                        {/* Confirm Password */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                required
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />

                        </div>


                        {/* Register button */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
                        >

                            {loading
                                ? "Creating Account..."
                                : "Create Student Account"
                            }

                        </button>

                    </form>


                    {/* Login link */}

                    <div className="text-center mt-6">

                        <p className="text-slate-500">

                            Already have an account?

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/login/student")
                                }
                                className="ml-2 text-blue-600 font-semibold hover:text-blue-700"
                            >
                                Login
                            </button>

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default StudentRegister;