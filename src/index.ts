import express from "express";
import { configDotenv } from "dotenv";

const app = express();
configDotenv();

const port = process.env.PORT;

app.get('/checker', (req, res)=>{
    res.send('I see youuuu 👀');
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port} 🚀`);
});

