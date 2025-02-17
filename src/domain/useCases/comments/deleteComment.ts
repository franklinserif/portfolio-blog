import { CommentRepository } from '@domain/repositories/comment.repository';
import { HttpException } from '@shared/errors/http.exception';
import { ILogger } from '@shared/interfaces/logs';
import { Logger } from '@shared/utils/logger/logger';

export class DeleteComment {
    private readonly logger: ILogger = new Logger(DeleteComment.name);

    constructor(private readonly commentRepository: CommentRepository) {}

    async execute(id: string): Promise<void> {
        try {
            const comment = await this.commentRepository.findOne(id);

            if (!comment) {
                throw new HttpException(404, 'comment not found');
            }

            await this.commentRepository.remove(id);
            this.logger.info(`comment with id ${id} was deleted`);
        } catch (error) {
            throw new HttpException(500, 'error deleting comment', error);
        }
    }
}
