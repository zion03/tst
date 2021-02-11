import https from 'https';
import http from 'http';
import url  from 'url';
import path  from 'path';

export default class HttpAdapter {

    constructor(path) {
        this.path = path;
    }

    getFileName() {
        return path.basename(url.parse(this.path).pathname);
    }

    getProtocol()  {
        return url.parse(this.path).protocol;
    }

    fetchBuffer() {
        return new Promise(resolve => {
            var request = (this.getProtocol() == 'https:' ? https : http);

            request.get(this.path, (res) => {
                const {statusCode} = res;
                let data = [];

                if (statusCode !== 200) {
                    resolve('');
                }

                res.on('data', (chunk) => {
                    data.push(chunk)
                });

                res.on("end", () => {
                    resolve(Buffer.concat(data));
                });

            }).on('error', (e) => {
                resolve('');
            });
        })
    };
}
