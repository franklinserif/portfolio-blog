import { CreateUserDto } from '@application/dtos/users/createUser.dto';
import { CreateUser } from '@domain/useCases/users/createUser';
import { TypeORMUserRepository } from '@infrastructure/repositories/TypeORMUser.repository';

export class UserService {
    private createUser: CreateUser;

    constructor() {
        const userRepository = new TypeORMUserRepository();
        this.createUser = new CreateUser(userRepository);
    }

    async create(createUserDto: CreateUserDto) {
        return this.createUser.execute(
            createUserDto.id,
            createUserDto.firstName,
            createUserDto.lastName,
            createUserDto.email,
            createUserDto.password
        );
    }
}
