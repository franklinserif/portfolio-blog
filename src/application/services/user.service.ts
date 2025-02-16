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

    /**
     * Retrieves all users.
     * @returns {Promise<User[]>} A promise that resolves to an array of users.
     */
    async findAll(): Promise<User[]> {
        return this.listUsers.execute();
    }

    /**
     * Retrieves a user by ID.
     * @param {string} id - The ID of the user.
     * @returns {Promise<User>} A promise that resolves to the user.
     */
    async findOne(id: string): Promise<User> {
        return this.getUserById.execute(id);
    }

    /**
     * Creates a new user.
     * @param {CreateUserDto} createUserDto - The data transfer object containing user details.
     * @returns {Promise<User>} A promise that resolves to the created user.
     */
    async create(createUserDto: CreateUserDto): Promise<User> {
        return this.createUser.execute(createUserDto);
    }

    /**
     * Updates an existing user.
     * @param {string} id - The ID of the user.
     * @param {UpdateUserDto} updateUserDto - The data transfer object containing updated user details.
     * @returns {Promise<User>} A promise that resolves to the updated user.
     */
    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        return await this.updateUser.execute(id, updateUserDto);
    }

    /**
     * Deletes a user by ID.
     * @param {string} id - The ID of the user to delete.
     * @returns {Promise<void>} A promise that resolves when the user is deleted.
     */
    async remove(id: string): Promise<void> {
        await this.deleteUser.execute(id);
    }
}
