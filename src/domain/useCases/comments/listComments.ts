import { CommentRepository } from '@domain/repositories/comment.repository';
import { Comment } from '@domain/entities/comment';

export class ListComments {
    constructor(private readonly commentRepository: CommentRepository) {}

    async execute(): Promise<Comment[]> {
        try {
            const comments = await this.commentRepository.findAll();

            const serializeComments = Comment.serializeAll(comments);
            return serializeComments;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
}
