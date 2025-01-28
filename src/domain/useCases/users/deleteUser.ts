import { UserRepository } from '@domain/repositories/user.repository';
import { DeleteResult } from 'typeorm';

export class DeleteUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string): Promise<DeleteResult> {
        return await this.userRepository.remove(id);
    }
}
