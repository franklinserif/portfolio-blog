import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import { UserService } from '@application/services/user.service';
import { CreateUserDto } from '@application/dtos/createUser.dto';

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

    async createUser(req: Request, res: Response) {
        const createUserDto: CreateUserDto = req.body;

        const user = await this.userService.create(createUserDto);

        res.status(200).json(user);
    }

    async updateUser(_: Request, res: Response) {
        res.status(201).json({});
    }

    async removeUser(_: Request, res: Response) {
        res.status(201).json({});
    }
}
