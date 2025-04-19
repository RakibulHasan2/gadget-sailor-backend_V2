import jwt, { Secret } from 'jsonwebtoken';
import config from '../config/index';
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
    decoded?: any;
}

// verify JWT token
export default function verifyJWT(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send('unauthorized access')
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, config.access_token as Secret, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: 'forbidden access' })
        }
        req.decoded = decoded;
        next()
    })
}