import { UserNotFoundError } from '../error/UserNotFoundError.js';
import { TaskAssignedUserError } from '../error/TaskAssignedUserError.js'
import { findAllUsers , findUserById, insertUser , editUser , removeUser } from '../repository/usersRepository.js';

export const getAllUsers = async () => {
    return await findAllUsers();
};

export const getUserById = async (id) => {
    const user = await findUserById(id);
    
    if(!user) {
        throw new UserNotFoundError();
    }
    
    return user;
};

export const createUserFromName = async (name) => {
    return await insertUser(name);
};

export const updateUserByIdAndName = async (id, name) => {

    const newUser = await editUser(id, name);

    if (!newUser) {
        throw new UserNotFoundError();
    }


    return newUser;
};

export const deleteUserById = async(id) => {

    try {
        const user = await removeUser(id);

        if(!user){
            throw new UserNotFoundError();
        }

        return user;
    } catch (error) {
        if(error.code === '23503') {
            throw new TaskAssignedUserError();
        }

        throw error;
    }

};