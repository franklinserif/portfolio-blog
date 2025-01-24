import express from 'express';

class ServerBootstrap {
    private app: express.Application = express();
    private port: number = 3000;

    constructor() {
        this.listen();
    }

    private listen() {
        this.app.listen(this.port, () => {
            console.log('server is running at port: ', this.port);
        });
    }
}

new ServerBootstrap();
