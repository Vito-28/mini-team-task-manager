export class CategoryNotFoundError extends Error {
    constructor(message = "Category not found") {
        super(message);
        this.name = "CategoryNotFoundError";
    }
};