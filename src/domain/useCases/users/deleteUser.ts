import { UserRepository } from '@domain/repositories/user.repository';
import { HttpException } from '@shared/errors/http.exception';
import { ILogger } from '@shared/interfaces/logs';
import { Logger } from '@shared/utils/logger/logger';

export class DeleteUser {
    private readonly logger: ILogger = new Logger(DeleteUser.name);

    constructor(private userRepository: UserRepository) {}

    async execute(id: string): Promise<void> {
        try {
            const user = await this.userRepository.findOne(id);

            if (!user) {
                throw new HttpException(404, 'user not found');
            }

            this.logger.info(`user with id ${id} was deleted`);
            await this.userRepository.remove(id);
        } catch (error) {
            throw new HttpException(500, 'error deleting user', error);
        }
    }
}
