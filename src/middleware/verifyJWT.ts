import { Request, Response, NextFunction } from 'express';
import { configDotenv } from 'dotenv';
import jwt from 'jsonwebtoken';

configDotenv();

export default function (req: Request, res: Response, next: NextFunction){
    const authorization = req.headers['authorization'];

    if(authorization === undefined){
        res.status(401).json({ message: 'Access Token needed'});   
        return;
    }

    const accessToken = authorization.split(' ')[1];
    jwt.verify(
        accessToken, 
        process.env.ACCESS_TOKEN!,
        (err, decoded) => {
            if(err) return res.status(403).send({message: 'Expired token detected'})
            
            // decoded : { username: string, iat: number, exp: number }

            next();
        }
    );
}