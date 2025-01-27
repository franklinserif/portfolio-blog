import { autoInjectable } from 'tsyringe';
import { User } from '@domain/entities/user';
import { UserRepository } from '@domain/repositories/UserRepository';

@autoInjectable()
export class CreateUser {
    constructor(private userRepository: UserRepository) {}

    async execute({
        id,
        firstName,
        lastName,
        email,
        password,
        createdAt,
        updatedAt
    }: User) {
        const user = new User(
            id,
            firstName,
            lastName,
            email,
            password,
            createdAt,
            updatedAt
        );
        return this.userRepository.create(user);
    }
}
