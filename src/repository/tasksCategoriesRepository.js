import pool  from '../database/db.js';

export const insertCategoryToTheTask = async (taskId, categoryId) => {
    
    const result = await pool.query(
        'INSERT INTO tasks_categories (task_id, category_id) VALUES ($1, $2) RETURNING *',
        [taskId, categoryId]
    );

    return result.rows[0] ?? null;

};

export const insertCategoriesToTheTask = async (taskId, listCategoriesId, placeholder) => {
    const result = await pool.query(
        `INSERT INTO tasks_categories (task_id, category_id) VALUES ${placeholder} RETURNING *`,
        [taskId, ...listCategoriesId]
    );

    return result.rows ?? null;
};

export const findTasksCategoriesByTaskId = async (id) => {

    const result = await pool.query(
        'SELECT categories.id, categories.name FROM categories INNER JOIN tasks_categories ON tasks_categories.category_id = categories.id WHERE tasks_categories.task_id = ($1)',
        [id]
    );

    return result.rows;
};

export const findTasksCategoriesByCategoryId = async (id) => {

    const result = await pool.query(
        'SELECT tasks.id, tasks.title, tasks.completed, tasks.user_id FROM tasks INNER JOIN tasks_categories ON tasks_categories.task_id = tasks.id WHERE tasks_categories.category_id = ($1)',
        [id]
    );

    return result.rows;
};

export const removeTasksCategories = async (taskId, categoryId) => {

    const result = await pool.query(
        `DELETE FROM tasks_categories WHERE task_id = $1 AND category_id = $2 RETURNING *;`, [taskId, categoryId]
    );

    return result.rows[0] ?? null;
};