import { Tag } from '@infrastructure/entities/tag.entity';

type TTag = Omit<Tag, 'checkFieldsBeforeInsert' | 'updatedAt' | 'createdAt'>;

export interface TagRepository {
    findAll(): Promise<Tag[]>;

    findOne(id: string): Promise<Tag>;

    create(tag: TTag): Promise<Tag>;

    update(id: string, tag: Partial<TTag>): Promise<Tag>;

    remove(id: string): Promise<void>;
}
