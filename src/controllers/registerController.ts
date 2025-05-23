import { Request, Response } from "express";
import data from './../models/users.json';
import bcrypt from "bcrypt";
import { errorLogger } from "../utils/loggerFn";
import { UserType } from "../types";
import updateUsers from "../utils/updateUsers";

export default function (req: Request, res: Response){
    const users: UserType[] = data;
    
    try{
        const { username, password } = req.body;

        if(!username){ res.status(400).send({message: 'Username is not provided'}); throw new Error('Username is not provided'); }
        if(!password){ res.status(400).send({message: 'Password is not provided'}); throw new Error('Password is not provided'); }

        //Check for similar 
        const similarUser = users.filter(user => user.username===username);
        
        if(similarUser.length>0){
            res.status(400).send({ message: 'Username already exists' });
            return
        }

        //Add User to json data
        const hashed = bcrypt.hashSync(password, 10);
        users.push({ username, password: hashed });
        updateUsers(users);

        res.status(200).send({ message: 'Success' });
    }catch(error){
        console.log(error);
        errorLogger(error as string);

        if(!res.headersSent){
            res.status(400).send({ message: 'An error occured while processing' });
        }
    }
}