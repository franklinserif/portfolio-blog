import { User } from '@domain/entities/user';
import { UserRepository } from '@domain/repositories/user.repository';

export class UpdateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(
        id: string,
        firstName?: string,
        lastName?: string,
        email?: string,
        password?: string
    ): Promise<User> {
        const user = User.serializeUser(
            await this.userRepository.update(id, {
                firstName,
                lastName,
                email,
                password
            })
        );

        return user;
    }
}
