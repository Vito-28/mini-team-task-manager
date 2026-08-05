const errorHandler = (err, req, res, next) => {
    return res.status(500).send("Internal Server Error");
};

export default errorHandler;