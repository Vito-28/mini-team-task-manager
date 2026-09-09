export class DuplicateInsertError extends Error {
    constructor(message = "Tasks Categories already exist") {
        super(message);
        this.name = "DuplicateInsertError";
    }
}