import { Request, Response } from 'express';
import data from './../models/users.json';
import { UserType } from '../types';
import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

configDotenv();

export default function(req: Request, res: Response){
    const users: UserType[] = data;

    const cookies = req.cookies;
    const jwtToken = cookies.jwt;

    const user = users.find(user => user.refreshToken===jwtToken);

    if(user===undefined){ res.status(403).send({ message: 'Please try logging in again' }); return; }

    const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN!, { expiresIn: '60s' });

    res.status(200).send({ accessToken });
}