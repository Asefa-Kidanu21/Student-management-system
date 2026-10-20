

import sql from "../../../Config/Db.js";

export const getStudentProfileModel = async (userId) => {
    const result = await sql`
        SELECT
            id,
            name,
            email,
            role
        FROM users
        WHERE id = ${userId}
        AND role = 'student'
    `;

    return result[0];
};