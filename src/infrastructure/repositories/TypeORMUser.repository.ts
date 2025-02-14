import { DeleteResult, Repository } from 'typeorm';
import { AppDataSource } from '@infrastructure/database/dataSource';
import { User } from '@infrastructure/entities/user.entity';
import { UserRepository } from '@domain/repositories/user.repository';

export class TypeORMUserRepository implements UserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    /**
     * Retrieves all users from the database.
     * @returns {Promise<User[]>} A promise that resolves to an array of users.
     */
    async findAll(): Promise<User[]> {
        return await this.repository.find();
    }

    /**
     * Retrieves a single user by ID.
     * @param {string} id - The ID of the user to retrieve.
     * @returns {Promise<User>} A promise that resolves to the user.
     * @throws {Error} If the user is not found.
     */
    async findOne(id: string): Promise<User> {
        const user = await this.repository.findOne({ where: { id } });

        if (!user) {
            throw new Error('not found');
        }

        return user;
    }

    /**
     * Creates a new user in the database.
     * @param {User} user - The user data to create.
     * @returns {Promise<User>} A promise that resolves to the created user.
     */
    async create(user: User): Promise<User> {
        const newUser = this.repository.create(user);
        return await this.repository.save(newUser);
    }

    /**
     * Updates an existing user in the database.
     * @param {string} id - The ID of the user to update.
     * @param {Partial<User>} user - The partial user data to update.
     * @returns {Promise<User>} A promise that resolves to the updated user.
     * @throws {Error} If the user is not found.
     */
    async update(id: string, user: Partial<User>): Promise<User> {
        await this.findOne(id);
        await this.repository.update(id, user);
        return this.findOne(id);
    }

    /**
     * Deletes a user from the database.
     * @param {string} id - The ID of the user to delete.
     * @returns {Promise<DeleteResult>} A promise that resolves when the user is deleted.
     * @throws {Error} If the user is not found.
     */
    async remove(id: string): Promise<DeleteResult> {
        await this.findOne(id);
        return await this.repository.delete(id);
    }
}
