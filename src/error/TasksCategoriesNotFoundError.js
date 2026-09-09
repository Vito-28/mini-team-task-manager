export class TasksCategoriesNotFoundError extends Error {
    constructor(message = "Tasks Categories not found") {
        super(message);
        this.name = "TasksCategoriesNotFoundError";
    }
}