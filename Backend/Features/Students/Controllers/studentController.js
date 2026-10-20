


import {
    getStudentProfile
} from "../Services/studentService.js";

export const getProfile = async (req, res) => {
    try {

        const userId = req.user.id;

        const student = await getStudentProfile(userId);

        res.json({
            message: "Student profile retrieved successfully",
            data: student
        });

    } catch (error) {

        res.status(404).json({
            message: error.message
        });

    }
};