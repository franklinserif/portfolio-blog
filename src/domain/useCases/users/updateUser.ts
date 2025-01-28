import { UpdateUserDto } from '@application/dtos/users/updateUser.dto';
import { User } from '@domain/entities/user';
import { UserRepository } from '@domain/repositories/user.repository';

export class UpdateUser {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = User.serializeUser(
            await this.userRepository.update(id, updateUserDto)
        );

        return user;
    }
}
