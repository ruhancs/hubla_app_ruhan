import { ReadStream, createReadStream } from "fs";

export const getFileBuffer = (filePath:string) => {

    const readStream = createReadStream(filePath);
    const fileParts = [];

    return new Promise<{buffer:Buffer, stream:ReadStream}>((resolve,reject) => {
        readStream.on("data", filePart => fileParts.push(filePart));

        readStream.on("error", err => reject(err))

        readStream.on("close", () => {
            resolve({
                buffer: Buffer.concat(fileParts) as Buffer, //converting array to buffer
                stream: readStream
            })
        })
    })
}