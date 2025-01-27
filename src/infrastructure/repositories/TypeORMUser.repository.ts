import { Repository } from 'typeorm';
import { AppDataSource } from '@infrastructure/database/dataSource';
import { User } from '@domain/entities/user';
import { UserRepository } from '@domain/repositories/user.repository';

export class TypeORMUserRepository implements UserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async findAll() {
        return await this.repository.find();
    }

    async findOne(id: string) {
        const user = await this.repository.findOne({ where: { id } });

        if (!user) {
            throw new Error('not found');
        }

        return user;
    }

    async create(user: User) {
        const newUser = this.repository.create(user);

        return await this.repository.save(newUser);
    }

    async update(id: string, user: Partial<User>) {
        await this.findOne(id);

        await this.repository.update(id, user);

        return this.findOne(id);
    }

    async remove(id: string) {
        await this.findOne(id);

        return await this.repository.delete(id);
    }
}
