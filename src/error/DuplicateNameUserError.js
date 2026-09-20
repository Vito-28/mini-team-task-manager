export class DuplicateNameUserError extends Error {
    constructor(message = "User name already exists") {
        super(message);
        this.name = "DuplicateNameUserError";
    }
};