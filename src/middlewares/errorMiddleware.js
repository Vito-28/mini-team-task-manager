import { NotFoundError } from "../error/NotFoundError.js";
import { UserNotFoundError } from "../error/UserNotFoundError.js";
import { CategoryNotFoundError } from "../error/CategoryNotFoundError.js"
import { TasksCategoriesNotFoundError } from "../error/TasksCategoriesNotFoundError.js";
import { DuplicateInsertError } from "../error/DuplicateInsertError.js";
import { TaskAssignedUserError } from "../error/TaskAssignedUserError.js"
import { TaskAssignedCategoryError } from "../error/TaskAssignedCategoryError.js"
import { DuplicateNameUserError } from "../error/DuplicateNameUserError.js";
import { InvalidCredentialsError } from "../error/InvalidCredentialsError.js";
import { TaskAssignedCategoriesError } from "../error/TaskAssignedCategoriesError.js";
import { TaskMatchUserError } from "../error/TaskMatchUserError.js";

const errorHandler = (err, req, res, next) => {

    console.error(err);
    
    if (err instanceof NotFoundError) {
        return res.status(404).json({
            message: err.message
        });
    } else if (err instanceof UserNotFoundError) {
        return res.status(404).json({
            message: err.message
        });
    } else if (err instanceof CategoryNotFoundError) {
        return res.status(404).json({
            message: err.message
        });
    } else if (err instanceof TasksCategoriesNotFoundError) {
        return res.status(404).json({
            message: err.message
        });
    } else if (err instanceof DuplicateInsertError) {
        return res.status(409).json({
            message: err.message
        });
    } else if(err instanceof DuplicateNameUserError) {
        return res.status(409).json({
            message: err.message
        });
    } else if (err instanceof TaskAssignedUserError) {
        return res.status(409).json({
            message: err.message
        });
    }  else if (err instanceof TaskAssignedCategoryError) {
        return res.status(409).json({
            message: err.message
        });
    } else if (err instanceof TaskAssignedCategoriesError) {
        return res.status(409).json({
            message: err.message
        });
    } else if (err instanceof InvalidCredentialsError) {
        return res.status(401).json({
            message: err.message
        });
    }  else if (err instanceof TaskMatchUserError) {
        return res.status(403).json({
            message: err.message
        });
    }
    
    return res.status(500).json({
        message: "Internal Server Error"
    });
}

export default errorHandler;