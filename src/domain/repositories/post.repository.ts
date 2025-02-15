import { Post } from '@infrastructure/entities/post.entity';

type TPost = Omit<Post, 'checkFieldsBeforeInsert' | 'createdAt' | 'updatedAt'>;

export interface PostRepository {
    findAll(): Promise<Post[]>;

    findOne(id: string): Promise<Post>;

    create(post: TPost): Promise<Post>;

    update(id: string, post: Partial<TPost>): Promise<Post>;

    remove(id: string): Promise<void>;
}
