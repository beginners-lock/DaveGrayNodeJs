import  { Response, Request } from "express";
import data from './../models/users.json';
import { UserType } from "../types";
import bcrypt from "bcrypt";
import { errorLogger } from "../utils/loggerFn";

export default function (req: Request, res: Response){
    try{
        const users: UserType[] = data;
        const { username, password } = req.body;

        if(!username){ res.status(400).send({message: 'Username is not provided'}); throw new Error('Username is not provided'); }
        if(!password){ res.status(400).send({message: 'Password is not provided'}); throw new Error('Password is not provided'); }

        //Check for user
        const userFound = users.find(user => user.username===username);
        
        if(userFound===undefined){
            res.status(400).send({message: 'User not found'})
            return
        }

        //Confirm password
        const accurate = bcrypt.compareSync(password, userFound.password)

        if(!accurate){
            res.status(200).send({message: 'Invalid credentials'});
        }else{
            res.status(200).send({message: 'Success'});
        }
    }catch(error){
        console.log(error);
        errorLogger(error as string);

        if(!res.headersSent){
            res.status(400).send({ message: 'An error occured while processing' });
        }
    }
}