import { Tag } from '@domain/entities/tag';
import { TagRepository } from '@domain/repositories/tag.repository';
import { HttpException } from '@shared/errors/http.exception';

export class GetTag {
    constructor(private tagRepository: TagRepository) {}

    async execute(id: string): Promise<Tag> {
        try {
            const tag = await this.tagRepository.findOne(id);

            if (!tag) {
                throw new HttpException(404, 'tag not found');
            }

            const serializedTag = Tag.serializeTag(tag);

            return serializedTag;
        } catch (error) {
            throw new HttpException(500, 'error getting tag', error);
        }
    }
}
