import { UpdateTagDto } from '@application/dtos/tags/updateTag';
import { Tag } from '@domain/entities/tag';
import { TagRepository } from '@domain/repositories/tag.repository';
import { HttpException } from '@shared/errors/http.exception';
import { ILogger } from '@shared/interfaces/logs';
import { Logger } from '@shared/utils/logger/logger';

export class UpdateTag {
    private readonly Logger: ILogger = new Logger(UpdateTag.name);

    constructor(private tagRepository: TagRepository) {}

    async execute(id: string, updateTagDto: UpdateTagDto): Promise<Tag> {
        try {
            const tagFounded = await this.tagRepository.findOne(id);

            if (!tagFounded) {
                throw new HttpException(404, 'tag not found');
            }

            const updatedTag = await this.tagRepository.update(
                id,
                updateTagDto
            );
            const tag = Tag.serializeTag(updatedTag);
            this.Logger.info(`Tag with id ${id} was updated`);

            return tag;
        } catch (error) {
            throw new HttpException(500, 'error updating tag', error);
        }
    }
}
