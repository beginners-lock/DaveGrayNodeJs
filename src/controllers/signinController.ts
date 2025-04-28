import  { Response, Request } from "express";
import data from './../models/users.json';
import { UserType } from "../types";
import bcrypt from "bcrypt";
import { errorLogger } from "../utils/loggerFn";
import createKeys from "../utils/createKeys";
import updateUsers from "../utils/updateUsers";

export default function (req: Request, res: Response){
    try{
        const users: UserType[] = data;
        const { username, password } = req.body;

        if(!username){ res.status(400).send({message: 'Username is not provided'}); throw new Error('Username is not provided'); }
        if(!password){ res.status(400).send({message: 'Password is not provided'}); throw new Error('Password is not provided'); }

        //Check for user
        const userIndex = users.findIndex(user => user.username===username);
        
        if(userIndex===-1){
            res.status(400).send({message: 'User not found'})
            return
        }

        //Confirm password
        const accurate = bcrypt.compareSync(password, users[userIndex].password)

        if(!accurate){
            res.status(400).send({message: 'Invalid credentials'});
        }else{
            //Create the access and referesh tokens
            const { accessToken, refreshToken } = createKeys({ username });
            
            //Update refreshToken for the user on the users list
            users[userIndex].refreshToken = refreshToken;
            updateUsers(users);

            res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24*60*60*1000 });
            res.status(200).send({message: 'Success', accessToken});
        }
    }catch(error){
        console.log(error);
        errorLogger(error as string);

        if(!res.headersSent){
            res.status(400).send({ message: 'An error occured while processing' });
        }
    }
}