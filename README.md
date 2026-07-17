# Mini Team Task Manager

REST API built with Node.js and Express.

This project is developed progressively to learn backend development concepts.

## Volume 1 - Express Fundamentals

Implemented:

- Express server setup
- REST API architecture
- Controllers
- Services
- Repository pattern
- CRUD operations
- Route parameters
- Query parameters
- HTTP status codes

## Technologies

- Node.js
- Express
- JavaScript

## API Endpoints

### Get all tasks

GET /tasks


### Get task by id

GET /tasks/:id


### Create task

POST /tasks


Body:

{
"title":"Learn Express"
}


### Update task

PUT /tasks/:id


### Delete task

DELETE /tasks/:id