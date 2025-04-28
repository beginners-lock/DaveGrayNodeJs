import { Request, Response } from "express";
import data from './../models/users.json';

export function userRegisterController(req: Request, res: Response){
    const { username, password } = req.body;
    
    res.send(200);
}