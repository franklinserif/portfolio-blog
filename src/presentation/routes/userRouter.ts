import { autoInjectable } from 'tsyringe';
import { UserController } from '@presentation/controllers/userController';
import { BaseRouter } from './router';

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
