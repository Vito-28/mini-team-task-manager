import pool from "../database/db.js";

export const findAllTasksByCompleted = async (completed) => {
    const result = await pool.query(
        'SELECT * FROM tasks WHERE completed = $1',
        [completed]
    );

    return result.rows;    
};

export const findAllTasksByUserId = async (userId) => {
    const result = await pool.query(
        'SELECT * FROM tasks WHERE user_id = $1',
        [userId]
    );

    return result.rows;
};

export const findAllTasks = async () => {

    const result = await pool.query(
        "SELECT * FROM tasks"
    );

    return result.rows;

};

export const findTaskById = async (id) => {

    const result = await pool.query(
        'SELECT * FROM tasks WHERE id = $1',
        [id]
    );

    return result.rows[0] ?? null;

};

export const insertTask = async (title, userId) => {

    const result = await pool.query(
        'INSERT INTO tasks (title, user_id) VALUES ($1, $2) RETURNING *',
        [title, userId]
    );

    return result.rows[0] ?? null;

};

export const editTask = async (id, title) => {

    const result = await pool.query(
        `UPDATE tasks
        SET title = $1
        WHERE id = $2
        RETURNING *`,
        [title, id]

    );

    return result.rows[0] ?? null;

};

export const removeTask = async (id) => {

    const result = await pool.query(
        `DELETE FROM tasks WHERE id = $1 RETURNING *`, [id]
    );

    return result.rows[0] ?? null;
    
};