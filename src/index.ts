import express from "express";
import { configDotenv } from "dotenv";
import { emmitterInstance } from "./eventEmmitter";
import { loggerFn } from "./loggerFn";
import path from "path";
import fs from 'fs/promises';

const app = express();
configDotenv();

const port = process.env.PORT;

app.get('/tester', async (req, res) => {
    try{
        const data = await fs.readFile(path.join(__dirname, 'mockFiles', 'fake2.txt'), 'utf-8');
        res.send('Read complete');
    }catch(error){
        console.log(error);
        res.send('An error occured');
        emmitterInstance.emit('error', error);
        //throw new Error('An error occured during reading');
    }  
});

app.get('/checker', (req, res)=>{
    res.send('I see youuuu 👀');
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port} 🚀`);
});

emmitterInstance.on('error', (message)=>{
    console.log('Error occured');
    loggerFn(message);
});