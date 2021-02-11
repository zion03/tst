import sharp from 'sharp';
import { Readable } from 'stream'

export default class Resizer {

    constructor(buffer) {
        this.buffer = buffer;
    }

    resize(w, h) {
        return sharp(this.buffer).resize(w, h).toBuffer();
    }

    resizeStream(w, h) {
        const readable = new Readable();
        readable._read = () => {};
        this.resize(w, h).then((croppedBuffer) => {
            readable.push(croppedBuffer)
        });
        return readable;
    }
}
