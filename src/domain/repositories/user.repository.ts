import { User } from '@infrastructure/entities/user.entity';

type TUser = Omit<User, 'checkFieldsBeforeInsert' | 'updatedAt' | 'createdAt'>;

export interface UserRepository {
    findOne(id: string): Promise<User>;

    findAll(): Promise<User[]>;

    create(user: TUser): Promise<User>;

    update(id: string, user: Partial<TUser>): Promise<User>;

    remove(id: string): Promise<void>;
}
