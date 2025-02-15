import { User } from '@infrastructure/entities/user.entity';

export interface UserRepository {
    findOne(id: string): Promise<User>;

    findAll(): Promise<User[]>;

    create(user: Omit<User, 'checkFieldsBeforeInsert'>): Promise<User>;

    update(id: string, user: Partial<User>): Promise<User>;

    remove(id: string): Promise<void>;
}
