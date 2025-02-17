import { TagRepository } from '@domain/repositories/tag.repository';
import { HttpException } from '@shared/errors/http.exception';
import { ILogger } from '@shared/interfaces/logs';
import { Logger } from '@shared/utils/logger/logger';

export class DeleteTag {
    private readonly Logger: ILogger = new Logger(DeleteTag.name);

    constructor(private tagRepository: TagRepository) {}

    async execute(id: string): Promise<void> {
        try {
            const tag = await this.tagRepository.findOne(id);

            if (!tag) {
                throw new HttpException(404, 'tag not found');
            }

            await this.tagRepository.remove(id);
            this.Logger.info(`Tag with id ${id} was deleted`);
        } catch (error) {
            throw new HttpException(500, 'error deleting tag', error);
        }
    }
}
