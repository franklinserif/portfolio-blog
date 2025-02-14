import { CreateUserDto } from '@application/dtos/users/createUser.dto';
import { User } from '@domain/entities/user';
import { UserRepository } from '@domain/repositories/user.repository';
import { ILogger } from '@shared/interfaces/logs';
import { Crypt } from '@shared/utils/crypt/crypt';
import { Logger } from '@shared/utils/logger/logger';

export class CreateUser {
    private readonly logger: ILogger = new Logger(CreateUser.name);

    constructor(private userRepository: UserRepository) {}

    async execute(createUserDto: CreateUserDto): Promise<User> {
        try {
            const hashedPassword = await Crypt.hashPassword(
                createUserDto.password
            );

            const user = new User(createUserDto);

            return this.userRepository.create({
                ...user,
                password: hashedPassword
            });
        } catch (error) {
            this.logger.error(
                `something went wrong creating the user ${error}`
            );
            throw new Error(`something went wrong creating the user ${error}`);
        }
    }
}
