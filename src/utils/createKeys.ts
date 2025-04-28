import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

configDotenv();

export default function(user: { username: string }){
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN!, { expiresIn: '60s' });
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN!, { expiresIn: '1d' });

    return { accessToken, refreshToken };
}