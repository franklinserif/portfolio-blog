import { TagRepository } from '@domain/repositories/tag.repository';
import { Tag } from '@domain/entities/tag';
import { HttpException } from '@shared/errors/http.exception';

export class ListTags {
    constructor(private tagRepository: TagRepository) {}

    async execute(): Promise<Tag[]> {
        try {
            const tags = await this.tagRepository.findAll();

            const serialezedTags = Tag.serializeAll(tags);
            return serialezedTags;
        } catch (error) {
            throw new HttpException(500, 'error getting tag list', error);
        }
    }
}
