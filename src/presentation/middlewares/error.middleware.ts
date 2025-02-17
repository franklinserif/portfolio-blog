// @presentation/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { HttpException } from '@shared/errors/http.exception';
import { ILogger } from '@shared/interfaces/logs';
import { config } from '@shared/utils/config/config';
import { ServerState } from '@shared/enums/server';

export const errorMiddleware =
    (logger: ILogger) =>
    (
        error: Error | HttpException,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        if (error instanceof HttpException) {
            logger.error(
                `statusCode: ${error.statusCode} - message: ${error.message}`
            );
            res.status(error.statusCode).json({
                statusCode: error.statusCode,
                message: error.message,
                details: error.details,
                timestamp: new Date().toISOString()
            });
        } else {
            logger.error(`Unhandled error: ${error.stack}`);

            res.status(500).json({
                statusCode: 500,
                message: 'Internal Server Error',
                timestamp: new Date().toISOString(),
                ...(config.NODE_ENV === ServerState.DEVELOPMENT && {
                    stack: error.stack
                })
            });
        }
        next();
    };
