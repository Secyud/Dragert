import {Abortable} from "events";
import * as fileStream from "node:fs"

export const fs = {
        readFile: (
            path: fileStream.PathOrFileDescriptor,
            options?: (fileStream.ObjectEncodingOptions & Abortable) |
                undefined | null) => new Promise((resolve: (data: string | NonSharedBuffer) => void, reject) => {
            fileStream.readFile(path, options, (err, data) => {
                if (err) reject(err); else resolve(data);
            });
        }),
        writeFile: (path: fileStream.PathOrFileDescriptor,
                    data: string | NodeJS.ArrayBufferView,
                    options?: fileStream.WriteFileOptions) => new Promise((resolve, reject) => {
            fileStream.writeFile(path, data, options, (err) => {
                if (err) reject(err); else resolve(undefined);
            });
        }),
        createWriteStream: (path: fileStream.PathLike, options?: BufferEncoding) =>
            fileStream.createWriteStream(path, options),
        createReadStream: (path: fileStream.PathLike, options?: BufferEncoding) =>
            fileStream.createReadStream(path, options),
    }
;