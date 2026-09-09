export class TaskAssignedCategoryError extends Error {
    constructor(message = "Category is still assigned to one or more tasks") {
        super(message);
        this.name = "TaskAssignedCategoryError";
    }
};