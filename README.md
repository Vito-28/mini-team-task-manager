# Mini Team Task Manager

REST API built with Node.js and Express.

This project is developed incrementally to simulate the evolution of a real backend application while learning Node.js and Express fundamentals.

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
- Custom middlewares
  - Logger
  - Authentication
  - Request validation
- Global error handling
- Custom error classes
- Error propagation with `next(err)`

## Technologies

- Node.js
- Express
- JavaScript

## Project Structure

```
src/
├── controller/
├── service/
├── repository/
├── middlewares/
├── error/
├── data/
└── index.js
```

## API Endpoints

### Get all tasks

GET /tasks

### Get task by id

GET /tasks/:id

### Create task

POST /tasks

Body:

```json
{
  "title": "Learn Express"
}
```

### Update task

PUT /tasks/:id

### Delete task

DELETE /tasks/:id

## Next Volumes

Planned improvements:

- PostgreSQL integration
- SQL repository implementation
- Environment variables
- JWT authentication
- Input validation with dedicated libraries
- Automated testing