

import {
    getStudentProfileModel
} from "../Models/studentModel.js";

export const getStudentProfile = async (userId) => {

    const student = await getStudentProfileModel(userId);

    if (!student) {
        throw new Error("Student profile not found");
    }

    return student;
};