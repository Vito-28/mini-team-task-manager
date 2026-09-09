import { CategoryNotFoundError } from "../error/CategoryNotFoundError.js";
import { NotFoundError } from "../error/NotFoundError.js";
import { TaskAssignedCategoryError } from "../error/TaskAssignedCategoryError.js";
import { TaskAssignedUserError } from "../error/TaskAssignedUserError.js";
import { UserNotFoundError } from "../error/UserNotFoundError.js";

const errorHandler = (err, req, res, next) => {

    console.error(err);
    
    if (err instanceof NotFoundError) {
        return res.status(404).json({
            message: err.message
        });
    }  else if (err instanceof UserNotFoundError) {
        return res.status(404).json({
            message: err.message
        });
    } else if (err instanceof CategoryNotFoundError) {
        return res.status(404).json({
            message: err.message
        });
    } else if (err instanceof TaskAssignedUserError) {
        return res.status(409).json({
            message: err.message
        });
    } else if (err instanceof TaskAssignedCategoryError) {
        return res.status(409).json({
            message: err.message
        });
    }
    
    return res.status(500).json({
        message: "Internal Server Error"
    });
}

export default errorHandler;