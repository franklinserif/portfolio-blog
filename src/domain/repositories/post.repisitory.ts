import { Post } from '@infrastructure/entities/post.entity';

export interface PostRepository {
    findAll(): Promise<Post[]>;

    findOne(id: string): Promise<Post>;

    create(post: Omit<Post, 'checkFieldsBeforeInsert'>): Promise<Post>;

    update(id: string, post: Partial<Post>): Promise<Post>;

    remove(id: string): Promise<void>;
}
