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

export const validationTypeTaskIDBody = (req, res, next) => {
    const {taskId} = req.body;

    if(!Number.isInteger(taskId) || taskId <= 0) {
        return res.status(400).send("Task ID Format Error");
    }

    next();
};

export const validationTypeTaskIDParam = (req, res, next) => {
    const {taskId} = req.params;

    const parsedId = Number(taskId);

    if(!Number.isInteger(parsedId) || parsedId <= 0) {
        return res.status(400).send("Task ID Format Error");
    }

    next();
};

export const validationTypeCategoryID = (req, res, next) => {
    const {categoryId} = req.params;

    const parsedId = Number(categoryId);

    if(!Number.isInteger(parsedId) || parsedId <= 0) {
        return res.status(400).send("Category ID Format Error");
    }

    next();

};