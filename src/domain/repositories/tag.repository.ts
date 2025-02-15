import { Tag } from '@infrastructure/entities/tag.entity';

export interface TagRepository {
    findAll(): Promise<Tag[]>;

    findOne(id: string): Promise<Tag>;

    create(tag: Omit<Tag, 'checkFieldsBeforeInsert'>): Promise<Tag>;

    update(id: string, tag: Partial<Tag>): Promise<Tag>;

    remove(id: string): Promise<void>;
}
