import {Abortable} from "events";
import * as fs from "node:fs"

export class FileHelper {
    static readFile(
        path: fs.PathOrFileDescriptor,
        options?: (fs.ObjectEncodingOptions & Abortable) |
            undefined | null) {
        return new Promise((resolve: (data: string | NonSharedBuffer) => void, reject) => {
            fs.readFile(path, options, (err, data) => {
                if (err) reject(err); else resolve(data);
            })
        })

    }

    static writeFile(path: fs.PathOrFileDescriptor,
                     data: string | NodeJS.ArrayBufferView,
                     options?: fs.WriteFileOptions) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, data, options, (err) => {
                if (err) reject(err); else resolve(undefined);
            });
        })
    }

    static createWriteStream(path: fs.PathLike, options?: BufferEncoding) {
        return fs.createWriteStream(path, options);
    }

    static createReadStream(path: fs.PathLike, options?: BufferEncoding) {
        return fs.createReadStream(path, options);
    }
}