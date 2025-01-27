import { CreateUser } from '@domain/useCases/createUser';
import { TypeORMUserRepository } from '@infrastructure/repositories/TypeORMUser.repository';

export class UserService {
    private createUser: CreateUser;

    constructor() {
        const userRepository = new TypeORMUserRepository();
        this.createUser = new CreateUser(userRepository);
    }

    async create(
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ) {
        return this.createUser.execute(
            id,
            firstName,
            lastName,
            email,
            password
        );
    }
}
