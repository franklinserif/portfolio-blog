import { UserRepository } from '@domain/repositories/user.repository';

export class DeleteUser {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string): Promise<void> {
        const user = await this.userRepository.findOne(id);

        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }

        await this.userRepository.remove(id);
    }
}
