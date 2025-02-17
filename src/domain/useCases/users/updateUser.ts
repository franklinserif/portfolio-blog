import { UpdateUserDto } from '@application/dtos/users/updateUser.dto';
import { User } from '@domain/entities/user';
import { UserRepository } from '@domain/repositories/user.repository';
import { HttpException } from '@shared/errors/http.exception';
import { ILogger } from '@shared/interfaces/logs';
import { Logger } from '@shared/utils/logger/logger';

export class UpdateUser {
    private readonly logger: ILogger = new Logger(UpdateUser.name);

    constructor(private userRepository: UserRepository) {}

    async execute(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        try {
            const user = await this.userRepository.findOne(id);

            if (!user) {
                throw new HttpException(404, 'user not found');
            }

            const serializedUser = User.serializeUser(
                await this.userRepository.update(id, updateUserDto)
            );

            this.logger.info(`user with id ${id} was updated`);

            return serializedUser;
        } catch (error) {
            throw new HttpException(500, 'error updating user', error);
        }
    }
}
