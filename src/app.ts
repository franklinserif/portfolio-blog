import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

class ServerBootstrap {
    private app: express.Application = express();
    private port: number = 3000;

    constructor() {
        this.app.use(helmet());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(morgan('combined'));
        this.app.use(
            rateLimit({
                windowMs: 10 * 100 * 10000, // 10 minutes
                max: 100, // Limit each ip to 100 request per 10 minutes,
                message: 'Too many request from this IP, Try again later.'
            })
        );
        this.listen();
    }

    private listen() {
        this.app.listen(this.port, () => {
            console.log('server is running at port: ', this.port);
        });
    }
}

new ServerBootstrap();
