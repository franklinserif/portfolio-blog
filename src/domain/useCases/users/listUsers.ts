import { User } from '@domain/entities/user';
import { UserRepository } from '@domain/repositories/user.repository';

export class ListUsersUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(): Promise<User[]> {
        const users = User.serializeAll(await this.userRepository.findAll());

        return users;
    }
}
