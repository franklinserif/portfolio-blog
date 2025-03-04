import { autoInjectable } from 'tsyringe';
import { UserController } from '@presentation/controllers/user.controller';
import { CreateUserDto } from '@application/dtos/users/createUser.dto';
import { UpdateUserDto } from '@application/dtos/users/updateUser.dto';
import { validationMiddleware } from '@presentation/middlewares/validation.middleware';
import { BaseRouter } from '@presentation/routes/router';
import { IdParamDto } from '@shared/dtos/idParam.dto';
import { REQUEST } from '@shared/enums/data';

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
            (req, res) => this.userController.createUser(req, res)
        );

        this.router.get(
            '/users/:id',
            validationMiddleware(IdParamDto, REQUEST.PARAMS),
            (req, res) => this.userController.findUser(req, res)
        );

        this.router.put(
            '/users/:id',
            validationMiddleware(IdParamDto, REQUEST.PARAMS),
            validationMiddleware(UpdateUserDto),
            (req, res) => this.userController.updateUser(req, res)
        );

        this.router.delete(
            '/users/:id',
            validationMiddleware(IdParamDto, REQUEST.PARAMS),
            (req, res) => this.userController.removeUser(req, res)
        );
    }
}
