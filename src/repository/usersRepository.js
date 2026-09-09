import pool from "../database/db.js";

export const findAllUsers = async () => {
    const result = await pool.query(
        "SELECT * FROM users"
    );

    return result.rows;
};

export const findUserById = async (id) => {

    const result = await pool.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
    );

    return result.rows[0] ?? null;

};

export const insertUser = async (name) => {
    
    const result = await pool.query(
        'INSERT INTO users (name) VALUES ($1) RETURNING *',
        [name]
    );

    return result.rows[0] ?? null;

};

export const editUser = async (id, name) => {

    const result = await pool.query(
        `UPDATE users
        SET name = $1
        WHERE id = $2
        RETURNING *`,
        [name, id]

    );

    return result.rows[0] ?? null;
};

export const removeUser = async (id) => {

    const result = await pool.query(
        `DELETE FROM users WHERE id = $1 RETURNING *`, [id]
    );

    return result.rows[0] ?? null;
};