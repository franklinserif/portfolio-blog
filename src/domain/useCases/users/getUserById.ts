import { User } from '@domain/entities/user';
import { UserRepository } from '@domain/repositories/user.repository';
import { HttpException } from '@shared/errors/http.exception';
import { ILogger } from '@shared/interfaces/logs';
import { Logger } from '@shared/utils/logger/logger';

export class GetUserById {
    private readonly logger: ILogger = new Logger(GetUserById.name);

    constructor(private userRepository: UserRepository) {}

    async execute(id: string): Promise<User> {
        try {
            const user = User.serializeUser(
                await this.userRepository.findOne(id)
            );

            return user;
        } catch (error) {
            throw new HttpException(500, 'error getting user by id', error);
        }
    }
}
