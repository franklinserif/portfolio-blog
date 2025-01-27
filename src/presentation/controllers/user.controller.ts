import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import { UserService } from '@application/services/user.service';

@autoInjectable()
export class UserController {
    private readonly userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async findUser(_: Request, res: Response) {
        res.status(200).json({ user: 'Franklin Rodriguez' });
    }

    async findAllUser(_: Request, res: Response) {
        res.status(200).json([]);
    }

    async createUser(_: Request, res: Response) {
        res.status(200).json({});
    }

    async updateUser(_: Request, res: Response) {
        res.status(201).json({});
    }

    async removeUser(_: Request, res: Response) {
        res.status(201).json({});
    }
}
