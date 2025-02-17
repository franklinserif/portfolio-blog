import { UserRepository } from '@domain/repositories/user.repository';
import { ILogger } from '@shared/interfaces/logs';
import { Logger } from '@shared/utils/logger/logger';

export class DeleteUser {
    private readonly logger: ILogger = new Logger(DeleteUser.name);

    constructor(private userRepository: UserRepository) {}

    async execute(id: string): Promise<void> {
        try {
            const user = await this.userRepository.findOne(id);

            if (!user) {
                throw new Error(`User with id ${id} not found`);
            }

            this.logger.info(`user with id ${id} was deleted`);
            await this.userRepository.remove(id);
        } catch (error) {
            throw new Error(
                `something wrong happend when tried to delete an user error: ${error}`
            );
        }
    }
}
