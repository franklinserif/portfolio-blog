import { Tag } from '@domain/entities/tag';
import { TagRepository } from '@domain/repositories/tag.repository';

export class GetTag {
    constructor(private tagRepository: TagRepository) {}

    async execute(id: string): Promise<Tag> {
        try {
            const tag = await this.tagRepository.findOne(id);

            if (!tag) {
                throw new Error(`Tag with id ${id} not found`);
            }

            const serializedTag = Tag.serializeTag(tag);

            return serializedTag;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
}
