


import { useEffect, useState } from "react";
import { getMyProfile } from "../services/studentService";

function StudentProfile() {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const result = await getMyProfile();

                console.log("Student profile:", result);

                setProfile(result.data);

            } catch (error) {

                console.log(error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load profile."
                );

            } finally {

                setLoading(false);

            }
        };

        fetchProfile();

    }, []);


    if (loading) {

        return (
            <div className="flex justify-center py-10">
                <p className="text-slate-600">
                    Loading profile...
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

            <div className="mb-6">

                <h2 className="text-3xl font-bold text-slate-800">
                    My Profile
                </h2>

                <p className="text-slate-500 mt-1">
                    View your student information
                </p>

            </div>


            {profile && (

                <div className="bg-white rounded-xl shadow p-6 max-w-2xl">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>
                            <p className="text-sm text-slate-500">
                                Name
                            </p>

                            <p className="text-lg font-semibold text-slate-800">
                                {profile.name}
                            </p>
                        </div>


                        <div>
                            <p className="text-sm text-slate-500">
                                Email
                            </p>

                            <p className="text-lg font-semibold text-slate-800">
                                {profile.email}
                            </p>
                        </div>


                        <div>
                            <p className="text-sm text-slate-500">
                                Role
                            </p>

                            <span className="inline-block mt-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                                {profile.role}
                            </span>
                        </div>


                        <div>
                            <p className="text-sm text-slate-500">
                                User ID
                            </p>

                            <p className="text-lg font-semibold text-slate-800">
                                {profile.id}
                            </p>
                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default StudentProfile;