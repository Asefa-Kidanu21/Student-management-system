

import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";

function AdminUsers() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchUsers = async () => {

            try {

                const result = await getUsers();

                console.log("Users response:", result);

                // Our backend returns users inside data
                setUsers(result.data);

            } catch (error) {

                console.log(error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load users."
                );

            } finally {
                setLoading(false);
            }
        };

        fetchUsers();

    }, []);

    if (loading) {
        return (
            <div className="text-center py-10">
                <p className="text-slate-600">
                    Loading users...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
                {error}
            </div>
        );
    }

    return (
        <div>

            {/* Header */}
            <div className="mb-6">

                <h2 className="text-3xl font-bold text-slate-800">
                    All Users
                </h2>

                <p className="text-slate-500 mt-1">
                    Manage registered users
                </p>

            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-slate-800 text-white">

                            <tr>

                                <th className="px-6 py-4 text-left">
                                    ID
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Name
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Email
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Role
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {users.map((user) => (

                                <tr
                                    key={user.id}
                                    className="border-b hover:bg-slate-50"
                                >

                                    <td className="px-6 py-4">
                                        {user.id}
                                    </td>

                                    <td className="px-6 py-4 font-medium">
                                        {user.name}
                                    </td>

                                    <td className="px-6 py-4 text-slate-600">
                                        {user.email}
                                    </td>

                                    <td className="px-6 py-4">

                                        <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                                            {user.role}
                                        </span>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                {users.length === 0 && (
                    <p className="text-center py-8 text-slate-500">
                        No users found.
                    </p>
                )}

            </div>

        </div>
    );
}

export default AdminUsers;