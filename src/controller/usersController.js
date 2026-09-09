import { getAllUsers , getUserById , createUserFromName, updateUserByIdAndName, deleteUserById } from '../service/usersService.js';

export const getUsers = async (req, res, next) => {

    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }

};

export const getUser = async (req, res, next) => {

    try {
        const {id} = req.params;
        const user = await getUserById(id);
        
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }

};

export const createUser = async (req, res, next) => {

    try {
        const {name} = req.body;
    
        const user = await createUserFromName(name);

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }

};

export const updateUser = async (req, res, next) => {

    try {
        const {id} = req.params;
        const {name} = req.body;

        const user = await updateUserByIdAndName(id, name);

        res.status(200).json(user);        
    } catch (error) {
        next(error);
    }

};

export const deleteUser = async (req, res, next) => {

    try {
        const {id} = req.params;
        await deleteUserById(id);

        res.status(204).end();       
    } catch (error) {
        next(error);
    }

};