

import sql from "../../../Config/Db.js";

export const getAllUsersModel = async () => {
    const result = await sql`
        SELECT id, name, email, role
        FROM users
        ORDER BY id
    `;

    return result;
};


export const createUserModel = async (name, email, password, role) => {
    const result = await sql`
        INSERT INTO users
        (name, email, password, role)
        VALUES
        (${name}, ${email}, ${password}, ${role})
        RETURNING id, name, email, role
    `;

    return result[0];
};

export const updateUserModel = async (
    id,
    name,
    email,
    role
) => {
    const result = await sql`
        UPDATE users
        SET
            name = ${name},
            email = ${email},
            role = ${role}
        WHERE id = ${id}
        RETURNING id, name, email, role
    `;

    return result[0];
};
export const deleteUserModel = async (id) => {
    const result = await sql`
        DELETE FROM users
        WHERE id = ${id}
        AND role != 'admin'
        RETURNING id, name, email, role
    `;

    return result[0];
};