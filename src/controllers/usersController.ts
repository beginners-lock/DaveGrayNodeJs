import { Request, Response } from "express";
import data from './../models/users.json';
import { UserType } from "../types";
import { errorLogger } from "../utils/loggerFn";
import updateUsers from "../utils/updateUsers";
import bcrypt from 'bcrypt';

const users: UserType[] = data;

export function listUsers(req: Request, res: Response){
    res.status(200).send({ message:'success', users })
}

export function getUser(req: Request, res: Response){
    const { index } = req.params

    if (indexOutbound(parseInt(index))){ res.status(400).send({message: 'Index outbound'}); }

    const user = users[parseInt(index)];
    res.status(200).send({ message:'success', user });
}

export function editUser(req: Request, res: Response){
    try{
        const { index } = req.params;
        const { username, password } = req.body;

        if (indexOutbound(parseInt(index))){ res.status(400).send({message: 'Index outbound'}); throw new Error('Index outbound'); }
        if (!username){ res.status(400).send({message: 'Username is not provided'}); throw new Error('Username is not provided'); }
        if (!password){ res.status(400).send({message: 'Password is not provided'}); throw new Error('Password is not provided'); }  

        const hashed = bcrypt.hashSync(password, 10);
        users[parseInt(index)] = { username, password: hashed };
        updateUsers(users);

        res.status(200).send({ message:'success'});
    }catch(error){
        console.log(error);
        errorLogger(error as string);

        if(!res.headersSent){
            res.status(400).send({ message: 'An error occured while processing' });
        }
    }
}

export function editUserAttribute(req: Request, res: Response){
    try{
        const { index } = req.params;
        const { username, password } = req.body;

        
        if (indexOutbound(parseInt(index))){ res.status(400).send({message: 'Index outbound'}); throw new Error('Index outbound'); }
        if (!username && !password){ 
            res.status(400).send({message: 'No attribute is provided'}); throw new Error('No attribute is provided'); 
        } 

        const hashed = password ? bcrypt.hashSync(password, 10) : null;

        users[parseInt(index)] = { username: username || users[parseInt(index)].username,  password: hashed || users[parseInt(index)].password };
        updateUsers(users);

        res.status(200).send({ message:'success' });
    }catch(error){
        console.log(error);
        errorLogger(error as string);

        if(!res.headersSent){
            res.status(400).send({ message: 'An error occured while processing' });
        }
    }
}

export function deleteUser(req: Request, res: Response){
    try{
        const { index } = req.params;
        
        if (indexOutbound(parseInt(index))){ res.status(400).send({message: 'Index outbound'}); throw new Error('Index outbound'); }

        users.splice(parseInt(index), 1);
        console.log(users);

        updateUsers(users);

        res.status(200).send({ message: 'success' });
    }catch(error){
        console.log(error);
        errorLogger(error as string);

        if(!res.headersSent){
            res.status(400).send({ message: 'An error occured while processing' });
        }
    }
}

function indexOutbound(index: number){
    return index >= users.length
}