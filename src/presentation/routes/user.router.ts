import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import { UserController } from '@presentation/controllers/user.controller';
import { BaseRouter } from './router';
import { CreateUserDto } from '@application/dtos/createUser.dto';
import { validationMiddleware } from '@shared/middlewares/validation.middleware';

@autoInjectable()
export class UserRouter extends BaseRouter {
    private readonly userController: UserController;

    constructor(userController: UserController) {
        super();
        this.userController = userController;
    }

    routes(): void {
        this.router.get('/users', (req, res) =>
            this.userController.findAllUser(req, res)
        );

        this.router.post(
            '/users',
            validationMiddleware(CreateUserDto),
            (req: Request, res: Response) =>
                this.userController.createUser(req, res)
        );

        this.router.get('/users/:id', (req, res) =>
            this.userController.findUser(req, res)
        );

        this.router.put('/users/:id', (req, res) =>
            this.userController.updateUser(req, res)
        );

        this.router.delete('/users/:id', (req, res) =>
            this.userController.removeUser(req, res)
        );
    }
}
