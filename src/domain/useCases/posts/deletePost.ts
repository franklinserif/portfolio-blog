import { PostRepository } from '@domain/repositories/post.repository';
import { HttpException } from '@shared/errors/http.exception';
import { ILogger } from '@shared/interfaces/logs';
import { Logger } from '@shared/utils/logger/logger';

export class DeletePost {
    private readonly logger: ILogger = new Logger(DeletePost.name);

    constructor(private readonly postRepository: PostRepository) {}

    async execute(id: string): Promise<void> {
        try {
            const post = await this.postRepository.findOne(id);

            if (!post) {
                throw new HttpException(404, 'post not found');
            }

            await this.postRepository.remove(id);
            this.logger.info(`post with id ${id} was deleted`);
        } catch (error) {
            throw new HttpException(500, 'error deleting post', error);
        }
    }
}
