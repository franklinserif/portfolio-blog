import { User } from '@domain/entities/user';
import { UserRepository } from '@domain/repositories/user.repository';
import { ILogger } from '@shared/interfaces/logs';
import { Logger } from '@shared/utils/logger/logger';

export class ListUsers {
    private readonly logger: ILogger = new Logger(ListUsers.name);

    constructor(private userRepository: UserRepository) {}

    async execute(): Promise<User[]> {
        try {
            const users = User.serializeAll(
                await this.userRepository.findAll()
            );

            return users;
        } catch (error) {
            throw new Error(
                `something wrong happend when tried to get list of users ${error}`
            );
        }
    }
}
