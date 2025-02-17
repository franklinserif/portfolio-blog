import { UpdateCommentDto } from '@application/dtos/comments/updateComment';
import { CommentRepository } from '@domain/repositories/comment.repository';
import { Comment } from '@domain/entities/comment';
import { ILogger } from '@shared/interfaces/logs';
import { Logger } from '@shared/utils/logger/logger';
import { HttpException } from '@shared/errors/http.exception';

export class UpdateComment {
    private readonly logger: ILogger = new Logger(UpdateComment.name);

    constructor(private readonly commentRepository: CommentRepository) {}

    async execute(
        id: string,
        updateCommentDto: UpdateCommentDto
    ): Promise<Comment> {
        try {
            let comment = await this.commentRepository.findOne(id);

            if (!comment) {
                throw new HttpException(404, 'comment not found');
            }

            await this.commentRepository.update(id, updateCommentDto);
            comment = await this.commentRepository.findOne(id);

            const serializedComment = Comment.serializeComment(comment);
            this.logger.info(`comment with id ${id} was updated`);

            return serializedComment;
        } catch (error) {
            throw new HttpException(500, 'error updating comment', error);
        }
    }
}
