import { Comment } from '@infrastructure/entities/comment.entity';

type TComment = Omit<
    Comment,
    'checkFieldsBeforeInsert' | 'updatedAt' | 'createdAt'
>;

export interface CommentRepository {
    findAll(): Promise<Comment[]>;

    findOne(id: string): Promise<Comment>;

    create(comment: TComment): Promise<Comment>;

    update(id: string, comment: Partial<TComment>): Promise<Comment>;

    remove(id: string): Promise<void>;
}
