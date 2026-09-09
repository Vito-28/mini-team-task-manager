export const validationTitle = (req, res, next) => {
    const { title } = req.body;

    if (!title || title.trim().length === 0) {
        return res.status(400).send("Title required");
    }

    next();
};

export const validationName = (req, res, next) => {
    const { name } = req.body;

    if(!name || name.trim().length === 0) {
        return res.status(400).send("Name required");
    }

    next();

};