import fs from 'fs/promises';
import path from 'path';
import { UserType } from '../types';

export default function (data: UserType[]) {
    fs.writeFile(path.join(__dirname, '..', 'models', 'users.json' ), JSON.stringify(data, null, 2));
}