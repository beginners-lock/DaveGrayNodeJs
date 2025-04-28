//This is an efficient way of reading and writing from large file
//Prefered over fs.readFile, fs.writeFile and fs.appendFile

import fs from 'fs';
import path from 'path';
import { Transform } from 'stream';

const rs = fs.createReadStream(
    path.join(__dirname, 'mockFiles', 'lorem.txt'),
    'utf-8'
);

const ws = fs.createWriteStream(
    path.join(__dirname, 'mockFiles', 'new-lorem.txt')
);

//Efficient
rs.on('data', (chunk)=>{ ws.write(chunk); });

//More Efficient
rs.pipe(ws);

//This function connects a readStream to a writeStream with the intent of appending to the top of a file
//Apparently this didn't fly cause creating a write and read stream to the same file simulatenously clears the file
export function appendStream(fileName: string, entry: string){
    console.log('appending function');
    const rs = fs.createReadStream(path.join(__dirname, 'mockFiles', fileName), { encoding: 'utf-8' });
    const ws = fs.createWriteStream(path.join(__dirname, 'mockFiles', fileName));

    /*const transformer = new Transform({
        transform: (callback, encoding, data) => {
            const edit = `${entry}\n${data}`;
            callback(null, edit);
        }
    });

    rs.pipe(transformer).pipe(ws);*/
    rs.on('data', (chunk) => {
        console.log('data gotten');
        const edit = `${entry}\n${chunk}`;
        console.log(edit);
        ws.write(edit);
    })
}