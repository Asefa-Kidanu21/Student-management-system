

import sql from "../../../Config/Db.js";

export const createUserModel = async (
    name,
    email,
    password
) => {

    const result = await sql`
        INSERT INTO users
        (
            name,
            email,
            password,
            role
        )
        VALUES
        (
            ${name},
            ${email},
            ${password},
            'student'
        )
        RETURNING
            id,
            name,
            email,
            role
    `;

    return result[0];
};


export const findUserByEmailModel = async (email) => {

    const result = await sql`
        SELECT *
        FROM users
        WHERE email = ${email}
    `;

    return result[0];
};



