import { CommentRepository } from '@domain/repositories/comment.repository';
import { Comment } from '@domain/entities/comment';

export class GetCommentById {
    constructor(private readonly commentRepository: CommentRepository) {}

    async execute(id: string): Promise<Comment> {
        try {
            const comment = await this.commentRepository.findOne(id);

            if (!comment) {
                throw new Error(`comment with id ${id} was not found`);
            }

            const serializeComment = Comment.serializeComment(comment);
            return serializeComment;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
}
