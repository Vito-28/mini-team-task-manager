import { InvalidCredentialsError } from '../error/InvalidCredentialsError.js';
import { findUserByNameForAuthentication, insert } from '../repository/usersRepository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { DuplicateNameUserError } from '../error/DuplicateNameUserError.js';

export const login = async (name, password) => {

        const user = await findUserByNameForAuthentication(name);

        if(!user) {
            throw new InvalidCredentialsError();
        } 

        const isLogin = await bcrypt.compare(password, user.password);

        if(!isLogin) {
            throw new InvalidCredentialsError();
        }

        const token = jwt.sign(
            {
                sub: user.id,
                name: user.name
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        return token;

};

export const register = async (name, password) => {

    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return await insert(name, passwordHash);

    } catch (error) {
        if(error.code === '23505') {
            throw new DuplicateNameUserError();
        }

        throw error;
    }
};