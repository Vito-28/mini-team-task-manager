const validation = (req, res, next) => {
    const { title } = req.body;

    if (!title || title.trim().length === 0) {
        return res.status(400).send("Title required");
    }

    next();
};

export default validation;