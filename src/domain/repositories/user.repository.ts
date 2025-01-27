import { User } from '@domain/entities/user';
import { DeleteResult } from 'typeorm';

export interface UserRepository {
    findOne(id: string): Promise<User>;

    findAll(): Promise<User[]>;

    create(user: User): Promise<User>;

    update(id: string, user: Partial<User>): Promise<User>;

    remove(id: string): Promise<DeleteResult>;
}
