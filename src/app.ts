/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { container } from 'tsyringe';
import { UserRouter } from '@presentation/routes/user.router';
import { PostRouter } from '@presentation/routes/post.router';
import { config } from '@shared/utils/config/config';
import { AppDataSource } from './infrastructure/database/dataSource';
import { ILogger } from '@shared/interfaces/logs';
import { Logger } from '@shared/utils/logger/logger';
import { errorMiddleware } from '@presentation/middlewares/error.middleware';

class ServerBootstrap {
    private readonly app: express.Application = express();
    private readonly logger: ILogger = new Logger(ServerBootstrap.name);
    private readonly port: number = config.PORT;

    /**
     * Initializes the server application, sets up middleware, routes, database connection, and starts listening on the specified port.
     * @constructor
     */
    constructor() {
        this.registerProcessHandlers();
        this.initializeMiddleware();
        this.initConnect();
        this.app.use('/api', this.routers());
        this.handleNotFound();
        this.handleExceptions();
        this.listen();
    }

    private initConnect(): void {
        AppDataSource.initialize()
            .then(() => this.logger.info('Database connection successfully'))
            .catch((error) =>
                this.logger.error(`something went wrong ${error.stack}`)
            );
    }

    /**
     * Configures and applies various middleware to the Express application.
     * Includes security headers, request parsing, CORS, logging, and rate limiting (in production).
     * @method
     * @returns {void}
     */
    initializeMiddleware(): void {
        this.app.use(helmet());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(
            morgan('combined', {
                stream: { write: (message) => this.logger.info(message) }
            })
        );
        if (config.NODE_ENV === 'production') {
            this.app.use(
                '/api',
                rateLimit({
                    windowMs: 15 * 60 * 1000,
                    max: 100,
                    message:
                        'Too many requests from this IP, please try again later.'
                })
            );
        }
    }

    /**
     * Assembles and returns the application routes.
     * @method
     * @returns {express.Router[]} Array of Express routers containing the application routes
     */
    routers(): Array<express.Router> {
        const userRouter = container.resolve(UserRouter);
        const postRouter = container.resolve(PostRouter);

        return [userRouter.router, postRouter.router];
    }

    private handleNotFound(): void {
        this.app.use('/*', (req: Request, res: Response) => {
            res.status(404).json({
                statusCode: 404,
                message: 'Endpoint not found'
            });
        });
    }

    private handleExceptions(): void {
        this.app.use(errorMiddleware(this.logger));
    }

    private registerProcessHandlers(): void {
        process.on(
            'unhandledRejection',
            (reason: Error, promise: Promise<any>) => {
                this.logger.error(
                    `Unhandled Rejection at: ${promise}, reason: ${reason.message}`
                );
            }
        );

        process.on('uncaughtException', (error: Error) => {
            this.logger.error(`Uncaught Exception: ${error.message}`);
            process.exit(1);
        });
    }

    /**
     * Starts the server and listens on the predefined port.
     * @method
     * @private
     * @returns {void}
     */
    private listen(): void {
        this.app.listen(this.port, () => {
            this.logger.info(`Server is running at port: ${this.port}`);
        });
    }
}

new ServerBootstrap();
