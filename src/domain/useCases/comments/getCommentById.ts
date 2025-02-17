import { CommentRepository } from '@domain/repositories/comment.repository';
import { Comment } from '@domain/entities/comment';
import { HttpException } from '@shared/errors/http.exception';

export class GetCommentById {
    constructor(private readonly commentRepository: CommentRepository) {}

    async execute(id: string): Promise<Comment> {
        try {
            const comment = await this.commentRepository.findOne(id);

            if (!comment) {
                throw new HttpException(404, 'comment not found');
            }

            const serializeComment = Comment.serializeComment(comment);
            return serializeComment;
        } catch (error) {
            throw new HttpException(500, 'error getting comment by id', error);
        }
    }
}
