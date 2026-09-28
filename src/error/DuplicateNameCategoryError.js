export class DuplicateNameCategoryError extends Error {
    constructor(message = "Category name already exists") {
        super(message);
        this.name = "DuplicateNameCategoryError";
    }
};