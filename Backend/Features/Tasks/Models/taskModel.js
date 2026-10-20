import sql from "../../../Config/Db.js";


// Get all tasks
export const getAllTasksModel = async () => {

    const result = await sql`
        SELECT
            tasks.id,
            tasks.title,
            tasks.description,
            tasks.status,
            tasks.created_at,
            users.name AS user_name,
            users.email AS user_email
        FROM tasks
        JOIN users
            ON tasks.user_id = users.id
        ORDER BY tasks.id;
    `;

    return result;
};


// Create task
export const createTaskModel = async (
    userId,
    title,
    description
) => {

    const result = await sql`
        INSERT INTO tasks
        (
            user_id,
            title,
            description
        )
        VALUES
        (
            ${userId},
            ${title},
            ${description}
        )
        RETURNING
            id,
            user_id,
            title,
            description,
            status,
            created_at;
    `;

    return result[0];
};


// Update task as student/user
export const updateTaskModel = async (
    taskId,
    userId,
    title,
    description,
    status
) => {

    const result = await sql`
        UPDATE tasks
        SET
            title = ${title},
            description = ${description},
            status = ${status}
        WHERE id = ${taskId}
        AND user_id = ${userId}
        RETURNING
            id,
            user_id,
            title,
            description,
            status,
            created_at;
    `;

    return result[0];
};


// Update task as admin
export const updateTaskAsAdminModel = async (
    taskId,
    title,
    description,
    status
) => {

    const result = await sql`
        UPDATE tasks
        SET
            title = ${title},
            description = ${description},
            status = ${status}
        WHERE id = ${taskId}
        RETURNING
            id,
            user_id,
            title,
            description,
            status,
            created_at;
    `;

    return result[0];
};


// Delete task as student/user
export const deleteTaskModel = async (
    taskId,
    userId
) => {

    const result = await sql`
        DELETE FROM tasks
        WHERE id = ${taskId}
        AND user_id = ${userId}
        RETURNING
            id,
            user_id,
            title,
            description,
            status;
    `;

    return result[0];
};


// Delete task as admin
export const deleteTaskAsAdminModel = async (
    taskId
) => {

    const result = await sql`
        DELETE FROM tasks
        WHERE id = ${taskId}
        RETURNING
            id,
            user_id,
            title,
            description,
            status;
    `;

    return result[0];
};