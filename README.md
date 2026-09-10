# Mini Team Task Manager

REST API built with Node.js, Express and PostgreSQL.

This project is developed incrementally to simulate the evolution of a real backend application while learning backend development fundamentals, REST API design, relational databases and layered architecture.

## Volume 1 - Express Fundamentals

Implemented:

* Express server setup
* REST API architecture
* Controllers
* Services
* Repository pattern
* CRUD operations
* Route parameters
* Query parameters
* HTTP status codes
* Custom middlewares

  * Logger
  * Authentication
  * Request validation
* Global error handling
* Custom error classes
* Error propagation with `next(err)`

## Volume 2 - PostgreSQL Integration

Implemented:

* PostgreSQL database integration
* PostgreSQL connection pool
* SQL repositories
* CRUD operations with PostgreSQL
* Parameterized SQL queries
* Primary keys
* Foreign keys
* `NOT NULL` constraints
* `DEFAULT` values
* One-to-many relationship between users and tasks
* Many-to-many relationship between tasks and categories
* SQL `JOIN` queries
* Task filtering by user
* Task filtering by completion status
* PostgreSQL constraint error handling

## Technologies

* Node.js
* Express
* JavaScript
* PostgreSQL
* `pg`

## Architecture

The application follows a layered architecture:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
PostgreSQL
```

### Controller

Handles HTTP requests and responses.

Responsibilities:

* Read request parameters, query parameters and body
* Call the appropriate service
* Return HTTP responses
* Forward errors to the global error handler

### Service

Contains application and business logic.

Responsibilities:

* Coordinate application operations
* Handle application-specific errors
* Keep business logic separate from HTTP and database concerns

### Repository

Handles data persistence.

Responsibilities:

* Execute SQL queries
* Communicate with PostgreSQL
* Return database results to the service layer

### Database

PostgreSQL is accessed through a connection pool using the `pg` library.

## Project Structure

```text
mini-team-task-manager/
│
├── database/
│   ├── schema.sql
│   └── seed.sql
│
├── src/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── database/
│   ├── middlewares/
│   ├── error/
│   └── index.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Database

The project uses PostgreSQL with the following entities:

```text
users
  │
  │ 1:N
  ↓
tasks
  │
  │ N:M
  ↓
categories
```

The many-to-many relationship between tasks and categories is implemented through the `tasks_categories` junction table.

### Database setup

The SQL files required to create and populate the database are available in the `database/` directory.

Execute `database/schema.sql` to create the database structure.

Then execute `database/seed.sql` to insert sample data.

## API Endpoints

All protected endpoints require authorization.

### Tasks

#### Get all tasks

```http
GET /tasks
```

#### Get tasks by completion status

```http
GET /tasks?completed=true
```

The `completed` query parameter can be used to filter tasks by completion status.

#### Get tasks by user

```http
GET /users/:userId/tasks
```

#### Get task by ID

```http
GET /tasks/:id
```

#### Create task

```http
POST /tasks
```

Body:

```json
{
  "title": "Learn PostgreSQL",
  "userId": 1
}
```

#### Update task

```http
PUT /tasks/:id
```

Body:

```json
{
  "title": "Learn PostgreSQL and Express"
}
```

#### Delete task

```http
DELETE /tasks/:id
```

### Users

#### Get all users

```http
GET /users
```

#### Get user by ID

```http
GET /users/:id
```

#### Create user

```http
POST /users
```

Body:

```json
{
  "name": "Mario Rossi"
}
```

#### Update user

```http
PUT /users/:id
```

Body:

```json
{
  "name": "Mario Bianchi"
}
```

#### Delete user

```http
DELETE /users/:id
```

### Categories

#### Get all categories

```http
GET /categories
```

#### Get category by ID

```http
GET /categories/:id
```

#### Create category

```http
POST /categories
```

Body:

```json
{
  "name": "Work"
}
```

#### Update category

```http
PUT /categories/:id
```

Body:

```json
{
  "name": "Personal"
}
```

#### Delete category

```http
DELETE /categories/:id
```

### Task Categories

Tasks and categories have a many-to-many relationship.

#### Add a category to a task

```http
POST /tasks/:taskId/categories/:categoryId
```

#### Add multiple categories to a task

```http
POST /tasks_categories
```

#### Get categories associated with a task

```http
GET /tasks/:id/categories
```

#### Get tasks associated with a category

```http
GET /categories/:id/tasks
```

#### Remove a category from a task

```http
DELETE /tasks/:taskId/categories/:categoryId
```

## Error Handling

The application uses custom error classes and a centralized global error handler.

Examples include:

* `NotFoundError`
* `UserNotFoundError`
* `CategoryNotFoundError`
* `TasksCategoriesNotFoundError`
* `DuplicateInsertError`
* `TaskAssignedUserError`
* `TaskAssignedCategoryError`

PostgreSQL constraint errors are translated into application-specific errors before reaching the global error handler.

## Environment Variables

Database configuration is managed through environment variables.

Create a `.env` file based on `.env.example`.

Example:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=task_manager
DB_PASSWORD=your_password
DB_PORT=5432
```

The `.env` file must not be committed to the repository.

## Installation

Clone the repository and install the dependencies:

```bash
npm install
```

Configure the PostgreSQL database and environment variables.

Create the database structure:

```text
database/schema.sql
```

Populate the database with sample data:

```text
database/seed.sql
```

Start the application:

```bash
npm start
```

The API runs on:

```text
http://localhost:3000
```

## Next Volumes

Planned improvements:

* JWT authentication
* Improved input validation
* Automated testing
* API documentation
* Further PostgreSQL optimization
* Additional backend features
* Further architectural improvements

