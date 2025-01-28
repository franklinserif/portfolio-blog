import { User } from '@domain/entities/user';
import { UserRepository } from '@domain/repositories/user.repository';

export class CreateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ): Promise<User> {
        const user = new User(id, firstName, lastName, email, password);
        return this.userRepository.create(user);
    }
}
