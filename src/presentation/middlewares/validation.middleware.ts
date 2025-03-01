import { Request, Response, NextFunction } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export function validationMiddleware<T extends object>(
    type: ClassConstructor<T>,
    data: 'body' | 'params' = 'body'
): (req: Request, res: Response, next: NextFunction) => Promise<void> {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const errors = await validate(plainToInstance(type, req[data]));
        if (errors.length > 0) {
            res.status(400).json(errors);
        } else {
            next();
        }
    };
}
