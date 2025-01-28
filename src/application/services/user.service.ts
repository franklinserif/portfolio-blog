import { DeleteResult } from 'typeorm';
import { TypeORMUserRepository } from '@infrastructure/repositories/TypeORMUser.repository';
import { User } from '@domain/entities/user';
import { CreateUserDto } from '@application/dtos/users/createUser.dto';
import { UpdateUserDto } from '@application/dtos/users/updateUser.dto';
import { CreateUser } from '@domain/useCases/users/createUser';
import { DeleteUser } from '@domain/useCases/users/deleteUser';
import { GetUserById } from '@domain/useCases/users/getUserById';
import { ListUsers } from '@domain/useCases/users/listUsers';
import { UpdateUser } from '@domain/useCases/users/updateUser';

export class UserService {
    private listUsers: ListUsers;
    private getUserById: GetUserById;
    private createUser: CreateUser;
    private updateUser: UpdateUser;
    private deleteUser: DeleteUser;

    constructor() {
        const userRepository = new TypeORMUserRepository();

        this.listUsers = new ListUsers(userRepository);
        this.getUserById = new GetUserById(userRepository);
        this.createUser = new CreateUser(userRepository);
        this.updateUser = new UpdateUser(userRepository);
        this.deleteUser = new DeleteUser(userRepository);
    }

    async findAll(): Promise<User[]> {
        return this.listUsers.execute();
    }

    async findOne(id: string): Promise<User> {
        const user = await this.getUserById.execute(id);

        if (!user) {
            throw new Error(`user with id ${id} not found`);
        }

        return user;
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        return this.createUser.execute(createUserDto);
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        await this.findOne(id);

        return await this.updateUser.execute(id, updateUserDto);
    }

    async remove(id: string): Promise<DeleteResult> {
        return await this.deleteUser.execute(id);
    }
}
