import { User } from '@domain/entities/user';
import { CreateUser } from '@domain/useCases/user/createUser';
import { TypeORMUserRepository } from '@infrastructure/repositories/TypeORMUserRepository';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export class UserService {
    private createUser: CreateUser;

    constructor() {
        const userRepository = new TypeORMUserRepository();
        this.createUser = new CreateUser(userRepository);
    }

    async create(user: User) {
        this.createUser.execute(user);
    }
}
