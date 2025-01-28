import { User } from '@domain/entities/user';
import { UserRepository } from '@domain/repositories/user.repository';

export class GetUserByIdUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string): Promise<User> {
        const user = User.serializeUser(await this.userRepository.findOne(id));

        return user;
    }
}
