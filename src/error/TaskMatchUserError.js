export class TaskMatchUserError extends Error {
    constructor(message = "You do not have permission to access this task") {
        super(message);
        this.name = "TaskMatchUserError";
    }
}