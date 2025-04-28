import express from "express";
import { configDotenv } from "dotenv";
import { emmitterInstance } from "./utils/eventEmmitter";
import { errorLogger, loggerFn } from "./utils/loggerFn";
import path from "path";
import fs from 'fs/promises';
import { appendStream } from "./utils/fsStreams";
import { format } from "date-fns";
import authRouter from './routes/auth/index';
import bodyParser from "body-parser";
import requestLoggerMiddleware from './middleware/logger';

const app = express();
configDotenv();

const port = process.env.PORT;

app.use(bodyParser.json());

//Request Logger Middleware
app.use(requestLoggerMiddleware);

app.use('/auth', authRouter);

/*app.get('/tester', async (req, res) => {
    try{
        //const data = await fs.readFile(path.join(__dirname, 'mockFiles', 'fake2.txt'), 'utf-8');
        throw new Error('Let us see what this brings');
        res.send('Read complete');
    }catch(error){
        console.log(error);
        res.send('An error occured');
        emmitterInstance.emit('error', error);
        //throw new Error('An error occured during reading');
    }  
});

app.get('/testappendstream', (req, res) => {
    const now = format(Date.now(), 'dd/MM/yyyy hh:mm:ss aa');
    const msg = `${now} Logged`
    const response = appendStream('append.txt', msg);
    console.log(response);
    res.send('Logged');
});*/   

app.get('/checker', (req, res)=>{
    res.send('I see youuuu 👀');
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port} 🚀`);
});

emmitterInstance.on('error', (message)=>{
    errorLogger(message);
});