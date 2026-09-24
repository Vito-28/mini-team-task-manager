import { register, login } from '../service/authService.js';


export const loginUser = async (req, res, next) => {
    try {
        
        const {name, password} = req.body;
    
        const token = await login(name, password);

        res.status(200).json({ message: 'Login successful', token });
        
    } catch (error) {
        next(error);
    }
}

export const registerUser = async (req, res, next) => {

    try {
        const {name, password} = req.body;
    
        const user = await register(name, password);

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }

};