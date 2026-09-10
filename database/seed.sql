-- Users
INSERT INTO users (name)
VALUES
    ('Mario Rossi'),
    ('Luca Bianchi'),
    ('Giulia Verdi'),
    ('Anna Neri');

-- Categories
INSERT INTO categories (name)
VALUES
    ('Work'),
    ('Personal'),
    ('Urgent'),
    ('Study'),
    ('Shopping');

-- Tasks
INSERT INTO tasks (title, completed, user_id)
VALUES
    ('Complete project documentation', TRUE, 1),
    ('Fix authentication bug', FALSE, 1),
    ('Buy groceries', FALSE, 2),
    ('Study PostgreSQL', TRUE, 3),
    ('Prepare presentation', FALSE, 3),
    ('Buy new keyboard', FALSE, 4),
    ('Review pull request', TRUE, 2),
    ('Write API tests', FALSE, 1);

-- Task-category relationships
INSERT INTO tasks_categories (task_id, category_id)
VALUES
    (1, 1),
    (1, 4),
    (2, 1),
    (2, 3),
    (3, 2),
    (3, 5),
    (4, 4),
    (5, 1),
    (5, 3),
    (6, 2),
    (6, 5),
    (7, 1),
    (8, 1);

