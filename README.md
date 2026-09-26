# Mini Team Task Manager

REST API backend built with **Node.js, Express and PostgreSQL**.

The project was developed incrementally to practice backend development fundamentals, REST API design, relational databases, layered architecture, input validation, error handling and authentication.

The current version includes **JWT-based authentication and user-based resource authorization**.

---

## Features

* REST API
* Express.js server
* Layered architecture
* PostgreSQL integration
* Repository pattern
* CRUD operations
* Request validation
* Custom middleware
* Centralized error handling
* Custom application errors
* Parameterized SQL queries
* PostgreSQL constraints
* One-to-many relationships
* Many-to-many relationships
* JWT authentication
* Password hashing with bcrypt
* User registration and login
* Protected routes
* Task ownership
* Task/category ownership validation
* Task filtering by completion status
* PostgreSQL constraint error mapping

---

## Technologies

* Node.js
* Express
* JavaScript
* PostgreSQL
* `pg`
* `bcrypt`
* `jsonwebtoken`
* `dotenv`

---

## Architecture

The application follows a layered architecture:

```text
HTTP Request
     ↓
Controller
     ↓
Service
     ↓
Repository
     ↓
PostgreSQL
```

### Controller

Responsible for handling HTTP requests and responses.

Responsibilities:

* Read route parameters
* Read query parameters
* Read request bodies
* Call the appropriate service
* Return HTTP responses
* Forward errors to the global error handler

### Service

Contains application and business logic.

Responsibilities:

* Coordinate application operations
* Validate business conditions
* Handle application-specific errors
* Enforce ownership rules
* Translate relevant database errors into application errors

### Repository

Responsible for data persistence.

Responsibilities:

* Execute SQL queries
* Communicate with PostgreSQL
* Use parameterized queries
* Return database results to the service layer

### Middleware

The application uses middleware for:

* Request logging
* JWT authentication
* Input validation
* Global error handling

---

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
│   │   ├── authController.js
│   │   ├── categoriesController.js
│   │   ├── tasksCategoriesController.js
│   │   └── tasksController.js
│   │
│   ├── service/
│   │   ├── authService.js
│   │   ├── categoriesService.js
│   │   ├── tasksCategoriesService.js
│   │   ├── tasksService.js
│   │   └── usersService.js
│   │
│   ├── repository/
│   │   ├── categoriesRepository.js
│   │   ├── tasksCategoriesRepository.js
│   │   ├── tasksRepository.js
│   │   └── usersRepository.js
│   │
│   ├── database/
│   │   └── db.js
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   ├── loggerMiddleware.js
│   │   └── validationMiddleware.js
│   │
│   ├── error/
│   │   └── custom error classes
│   │
│   └── index.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

# Authentication

Authentication is implemented using **JWT**.

Passwords are never stored in plaintext.

During registration:

```text
Password
   ↓
bcrypt.hash()
   ↓
Password hash
   ↓
PostgreSQL
```

During login:

```text
Password
   ↓
bcrypt.compare()
   ↓
Credentials verified
   ↓
JWT generated
```

Protected requests use the following header:

```http
Authorization: Bearer <token>
```

The JWT contains the authenticated user's identity through the `sub` claim.

The authorization middleware verifies the token and exposes the authenticated user through:

```js
req.user
```

Example:

```js
req.user = {
    id: decoded.sub,
    name: decoded.name
};
```

---

## Authentication Endpoints

### Register

```http
POST /auth/register
```

Body:

```json
{
  "name": "Mario Rossi",
  "password": "password123"
}
```

The password must be at least 8 characters long.

Successful response:

```http
201 Created
```

The password is hashed with bcrypt before being stored.

---

### Login

```http
POST /auth/login
```

Body:

```json
{
  "name": "Mario Rossi",
  "password": "password123"
}
```

Successful response:

```json
{
  "message": "Login successful",
  "token": "<JWT>"
}
```

---

# Tasks

All task endpoints require JWT authentication.

### Get authenticated user's tasks

```http
GET /tasks
```

Only tasks belonging to the authenticated user are returned.

### Filter tasks by completion status

```http
GET /tasks?completed=true
```

or:

```http
GET /tasks?completed=false
```

The `completed` query parameter accepts only:

```text
true
false
```

### Get task by ID

```http
GET /tasks/:taskId
```

### Create task

```http
POST /tasks
```

Body:

```json
{
  "title": "Learn TypeScript"
}
```

The `userId` is not supplied by the client.

The authenticated user's ID is obtained from:

```js
req.user.id
```

### Update task

```http
PUT /tasks/:taskId
```

Body:

```json
{
  "title": "Learn TypeScript and Node.js"
}
```

Only the owner of the task can update it.

### Delete task

```http
DELETE /tasks/:taskId
```

Only the owner of the task can delete it.

A task cannot be deleted while it is still associated with categories.

---

# Categories

All category endpoints require JWT authentication.

### Get all categories

```http
GET /categories
```

### Get category by ID

```http
GET /categories/:categoryId
```

### Create category

```http
POST /categories
```

Body:

```json
{
  "name": "Study"
}
```

### Update category

```http
PUT /categories/:categoryId
```

Body:

```json
{
  "name": "Programming"
}
```

### Delete category

```http
DELETE /categories/:categoryId
```

A category cannot be deleted while it is associated with tasks.

---

# Task Categories

Tasks and categories have a many-to-many relationship.

The relationship is implemented through the `tasks_categories` junction table.

### Add a category to a task

```http
POST /tasks/:taskId/categories/:categoryId
```

Only the owner of the task can create the relationship.

### Add multiple categories to a task

```http
POST /tasks_categories
```

Body:

```json
{
  "taskId": 1,
  "listCategoriesId": [1, 3, 4]
}
```

Only the owner of the task can create these relationships.

### Get categories associated with a task

```http
GET /tasks/:taskId/categories
```

Only the owner of the task can access its categories.

### Get tasks associated with a category

```http
GET /categories/:categoryId/tasks
```

Only tasks belonging to the authenticated user are returned.

### Remove a category from a task

```http
DELETE /tasks/:taskId/categories/:categoryId
```

Only the owner of the task can remove the relationship.

---

# Validation

The API validates several types of input before reaching the controllers.

Examples include:

* Task title type and minimum length
* User name type and minimum length
* Password type and minimum length
* Task ID format
* Category ID format
* `completed` query parameter
* Category ID arrays

Invalid input returns:

```http
400 Bad Request
```

---

# Error Handling

The application uses custom error classes and a centralized error handler.

Examples include:

* `NotFoundError`
* `UserNotFoundError`
* `CategoryNotFoundError`
* `TasksCategoriesNotFoundError`
* `DuplicateInsertError`
* `DuplicateNameUserError`
* `InvalidCredentialsError`
* `TaskAssignedUserError`
* `TaskAssignedCategoryError`
* `TaskAssignedCategoriesError`
* `TaskMatchUserError`

The service layer translates relevant PostgreSQL constraint errors into application-specific errors.

Examples:

```text
PostgreSQL 23505
      ↓
DuplicateNameUserError
      ↓
409 Conflict
```

```text
PostgreSQL 23503
      ↓
TaskAssignedCategoriesError
      ↓
409 Conflict
```

Authorization failures return:

```http
403 Forbidden
```

Authentication failures return:

```http
401 Unauthorized
```

---

# Database

The project uses PostgreSQL.

Database entities:

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

The many-to-many relationship is implemented through:

```text
tasks_categories
```

### Users

```text
id
name
password
```

The `name` column is unique.

The `password` column stores bcrypt password hashes.

### Tasks

```text
id
title
completed
user_id
```

Each task belongs to a user.

### Categories

```text
id
name
```

Category names are unique.

### Task Categories

```text
task_id
category_id
```

The pair `(task_id, category_id)` is the primary key.

---

# Database Setup

The SQL files required to create and populate the database are located in:

```text
database/
```

Create the database structure using:

```text
database/schema.sql
```

Then populate it using:

```text
database/seed.sql
```

The development seed contains four users.

For the seeded users, the development password is:

```text
password123
```

This password is intended only for local development/testing.

---

# Environment Variables

Create a `.env` file based on `.env.example`.

Example:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=task_manager
DB_PASSWORD=your_password
DB_PORT=5432

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=5m
```

The `.env` file must not be committed to the repository.

---

# Installation

Clone the repository and install dependencies:

```bash
npm install
```

Configure PostgreSQL and the environment variables.

Create the database structure:

```text
database/schema.sql
```

Populate the database:

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

---

# Development Approach

The project was developed incrementally.

Each feature was implemented through small changes involving:

1. Code modification
2. Manual testing
3. Error verification
4. `git diff`
5. Commit
6. Push

The goal was not only to build an API, but to understand the reasoning behind the backend architecture and the interaction between:

```text
HTTP
 ↓
Express
 ↓
Middleware
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
PostgreSQL
```

---

# Current Status

## Phase 1 — JavaScript Backend

Completed:

* Node.js backend fundamentals
* Express
* REST API
* PostgreSQL
* SQL relationships
* Layered architecture
* Repository pattern
* Input validation
* Error handling
* Custom errors
* bcrypt password hashing
* JWT authentication
* Protected routes
* Task ownership
* Task/category ownership
* PostgreSQL constraint handling

The JavaScript backend is currently considered the completed first phase of the project.

---

# Next Phase

## Phase 2 — TypeScript

The next development phase will focus on TypeScript.

The objective is not simply to convert the existing JavaScript code to TypeScript.

The goal is to understand:

* Why TypeScript exists
* Static type checking
* Type inference
* Explicit types
* Interfaces
* Type aliases
* Unions
* Narrowing
* Generics
* Function typing
* Type-safe backend code
* TypeScript with Node.js
* TypeScript with Express
* TypeScript project configuration
* Compilation from TypeScript to JavaScript

The TypeScript phase will initially be developed separately from this JavaScript project in order to understand the language before introducing it into a larger backend codebase.
