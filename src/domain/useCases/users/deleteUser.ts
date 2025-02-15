import { UserRepository } from '@domain/repositories/user.repository';

export class DeleteUser {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string): Promise<void> {
        await this.userRepository.remove(id);
    }
}
