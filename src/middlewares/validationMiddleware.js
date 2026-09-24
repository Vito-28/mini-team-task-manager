export const validationTitle = (req, res, next) => {
    const { title } = req.body;

    if (!title || title.trim().length === 0) {
    return res.status(400).send("Title is required");
    }

    if (title.trim().length < 6) {
        return res.status(400).send("Title must be at least 6 characters");
    }

    next();
};

export const validationTypeTitle = (req, res, next) => {
    const {title} = req.body;

    if(typeof title !== "string") {
        return res.status(400).send("Title Format Error");
    }

    next();

};

export const validationName = (req, res, next) => {
    const { name } = req.body;

    if(!name || name.trim().length === 0) {
        return res.status(400).send("Name required");
    }

    if(name.trim().length < 3) {
        return res.status(400).send("Name must be at least 3 characters");
    }

    next();

};

export const validationTypeName = (req, res, next) => {
    const {name} = req.body;

    if(typeof name !== "string") {
        return res.status(400).send("Name Format Error");
    } 

    next();

};

export const validationPassword = (req, res, next) => {
    const {password} = req.body;

    if(!password || password.length < 8) {
        return res.status(400).send("Password must be at least 8 characters");
    }

    next();

};

export const validationTypePassword = (req, res, next) => {
    const {password} = req.body;

    if(typeof password !== "string") {
        return res.status(400).send("Password Format Error");
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

export const validationCategories = (req, res, next) => {
    const {listCategoriesId} = req.body;

    if(!listCategoriesId || listCategoriesId.length === 0) {
        return res.status(400).send("List ID Categories required");
    }

    next();

};

export const validationTypeCategories = (req, res, next) => {
    const { listCategoriesId } = req.body;

    if(!Array.isArray(listCategoriesId)) {
        return res.status(400).send("List ID Categories Format Error");
    }

    next();
};

export const validationTypeIDCategories = (req, res, next) => {
    const { listCategoriesId } = req.body;

    for (const id of listCategoriesId) {
        if(!Number.isInteger(id) || id <= 0) {
            return res.status(400).send("ID Categories Format Error");
        }
    }

    next();
};

export const validationTypeCompleted = (req, res, next) => {
    const { completed } = req.query;

    if(completed !== undefined && completed !== "true" && completed !== "false") {
        return res.status(400).send("Completed Format Error");
    }

    next();
};