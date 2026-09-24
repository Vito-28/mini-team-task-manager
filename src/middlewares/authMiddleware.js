import 'dotenv/config';
import jwt from 'jsonwebtoken';

const authorization = (req, res, next) => {

    const authHeader = req.headers['authorization'];

    if(authHeader && authHeader.split(' ')[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Access denied. No Bearer in Authorization header.' });
    }

    const token = authHeader && authHeader.split(' ')[1]; // Expects: Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.sub,
            name: decoded.name
        }
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }

};

export default authorization;