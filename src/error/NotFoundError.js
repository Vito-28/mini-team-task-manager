export class NotFoundError extends Error {
    constructor(message = "Task not found") {
        super(message);
        this.name = "NotFoundError";
    }
}