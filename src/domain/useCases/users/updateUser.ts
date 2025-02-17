import { UpdateUserDto } from '@application/dtos/users/updateUser.dto';
import { User } from '@domain/entities/user';
import { UserRepository } from '@domain/repositories/user.repository';
import { ILogger } from '@shared/interfaces/logs';
import { Logger } from '@shared/utils/logger/logger';

export class UpdateUser {
    private readonly logger: ILogger = new Logger(UpdateUser.name);

    constructor(private userRepository: UserRepository) {}

    async execute(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        try {
            const user = User.serializeUser(
                await this.userRepository.update(id, updateUserDto)
            );

            this.logger.info(`user with id ${id} was updated`);

            return user;
        } catch (error) {
            throw new Error(
                `something wrong happend when tried to updated an user error: ${error}`
            );
        }
    }
}
