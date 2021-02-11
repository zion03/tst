import HttpAdapter from './lib/HttpAdapter.js';
import Resizer from './lib/Resizer.js';
import fs from 'fs';

if (process.argv[2]) {
    let filePath = process.argv[2];

    let adapter = new HttpAdapter(filePath);
    let buffer = await adapter.fetchBuffer();

    if (buffer) {

        let resizer = new Resizer(buffer);
        let resizedBuffer = await resizer.resize(640, 480);


        fs.writeFile('original_' + adapter.getFileName(), buffer, () => {});
        fs.writeFile('cropped_' + adapter.getFileName(), resizedBuffer, () => {});

        //stream
        let stream = resizer.resizeStream(640, 480);
        stream.pipe(fs.createWriteStream("cropped_stream_" + adapter.getFileName()));
    }

} else {
    console.log('No file name');
}
