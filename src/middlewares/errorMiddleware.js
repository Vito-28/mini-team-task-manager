import { NotFoundError } from "../error/NotFoundError.js";

const errorHandler = (err, req, res, next) => {
    
    if (err instanceof NotFoundError) {
        return res.status(404).json({
            message: err.message
        });
    }
    
    return res.status(500).json({
        message: "Internal Server Error"
    });
}

export default errorHandler;