import { CreateTagDto } from '@application/dtos/tags/createTag';
import { Tag } from '@domain/entities/tag';
import { TagRepository } from '@domain/repositories/tag.repository';
import { Logger } from '@shared/utils/logger/logger';
import { ILogger } from '@shared/interfaces/logs';
import { HttpException } from '@shared/errors/http.exception';

export class CreateTag {
    private readonly logger: ILogger = new Logger(CreateTag.name);

    constructor(private tagRepository: TagRepository) {}

    async execute(tag: CreateTagDto): Promise<Tag> {
        try {
            const createdTag = await this.tagRepository.create(tag);
            this.logger.info(`Tag with id ${tag.id} created`);

            return Tag.serializeTag(createdTag);
        } catch (error) {
            throw new HttpException(500, 'error creating tag', error);
        }
    }
}
