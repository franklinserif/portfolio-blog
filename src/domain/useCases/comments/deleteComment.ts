import { CommentRepository } from '@domain/repositories/comment.repository';
import { ILogger } from '@shared/interfaces/logs';
import { Logger } from '@shared/utils/logger/logger';

export class DeleteComment {
    private readonly logger: ILogger = new Logger(DeleteComment.name);

    constructor(private readonly commentRepository: CommentRepository) {}

    async execute(id: string): Promise<void> {
        try {
            const comment = await this.commentRepository.findOne(id);

            if (!comment) {
                throw new Error(`comment with id ${id} was not found`);
            }

            await this.commentRepository.remove(id);
            this.logger.info(`comment with id ${id} was deleted`);
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
}
