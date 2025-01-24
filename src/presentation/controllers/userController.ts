import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export class UserController {
    findUser(_: Request, res: Response) {
        res.status(200).json({ user: 'Franklin Rodriguez' });
    }

    findAllUser(_: Request, res: Response) {
        res.status(200).json([]);
    }

    createUser(_: Request, res: Response) {
        res.status(200).json({});
    }

    updateUser(_: Request, res: Response) {
        res.status(201).json({});
    }

    removeUser(_: Request, res: Response) {
        res.status(201).json({});
    }
}
