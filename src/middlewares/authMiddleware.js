const authorization = (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1];

    if (token !== "secret123") {
        return res.status(401).send("Unauthorized");
    }

    next();

};

export default authorization;