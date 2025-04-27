import fs from 'fs';
import path from 'path';
import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';

export function loggerFn(message: string){
    try{
        const ws = fs.createWriteStream(path.join(__dirname, 'mockFiles', 'errorLog.txt'), { flags: 'a' });
        const now = format(Date.now(), 'dd/MM/yyy hh:mm:ss aa');
        const log = `LogID: ${uuid()}\n${message}\n${now}\n\n`;

        ws.write(log);
        console.log(`Log updated`);
    }catch(error){
        console.log(`An error occured while logging:\n${error}\n\n`);
    }
}