//This is an efficient way of reading and writing from large file
//Prefered over fs.readFile, fs.writeFile and fs.appendFile

import fs from 'fs';
import path from 'path';

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