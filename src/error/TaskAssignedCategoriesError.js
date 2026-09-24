export class TaskAssignedCategoriesError extends Error {
    constructor(message = "Task is still assigned to one or more categories") {
        super(message);
        this.name = "TaskAssignedCategoriesError";
    }
}