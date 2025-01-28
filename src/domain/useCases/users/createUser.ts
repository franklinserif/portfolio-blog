import { CreateUserDto } from '@application/dtos/users/createUser.dto';
import { User } from '@domain/entities/user';
import { UserRepository } from '@domain/repositories/user.repository';

export class CreateUser {
    constructor(private userRepository: UserRepository) {}

    async execute(createUserDto: CreateUserDto): Promise<User> {
        const user = new User(
            createUserDto.id,
            createUserDto.firstName,
            createUserDto.lastName,
            createUserDto.email,
            createUserDto.password
        );

        return this.userRepository.create(user);
    }
}
