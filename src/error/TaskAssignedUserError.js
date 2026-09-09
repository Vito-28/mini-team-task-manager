export class TaskAssignedUserError extends Error {
    constructor(message = "User is still assigned to one or more tasks") {
        super(message);
        this.name = "TaskAssignedUserError";
    }
};