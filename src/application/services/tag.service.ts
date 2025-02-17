import { TypeORMTagRepository } from '@infrastructure/repositories/TypeORMTag.repository';
import { Tag } from '@domain/entities/tag';
import { CreateTag } from '@domain/useCases/tags/createTag';
import { DeleteTag } from '@domain/useCases/tags/deleteTag';
import { GetTag } from '@domain/useCases/tags/getTag';
import { ListTags } from '@domain/useCases/tags/listTags';
import { UpdateTag } from '@domain/useCases/tags/updateTag';
import { CreateTagDto } from '@application/dtos/tags/createTag';
import { UpdateTagDto } from '@application/dtos/tags/updateTag';

export class TagService {
    private listTags: ListTags;
    private getTag: GetTag;
    private createTag: CreateTag;
    private updateTag: UpdateTag;
    private deleteTag: DeleteTag;

    constructor() {
        const tagRepository = new TypeORMTagRepository();

        this.listTags = new ListTags(tagRepository);
        this.getTag = new GetTag(tagRepository);
        this.createTag = new CreateTag(tagRepository);
        this.updateTag = new UpdateTag(tagRepository);
        this.deleteTag = new DeleteTag(tagRepository);
    }

    /**
     * Retrieves all tags from the repository.
     * @returns {Promise<Tag[]>} A promise that resolves to an array of Tag entities.
     */
    async findAll(): Promise<Tag[]> {
        return await this.listTags.execute();
    }

    /**
     * Retrieves a single tag by its ID.
     * @param {string} id - The ID of the tag to retrieve.
     * @returns {Promise<Tag>} A promise that resolves to the found Tag entity.
     */
    async findOne(id: string): Promise<Tag> {
        return await this.getTag.execute(id);
    }

    /**
     * Creates a new tag.
     * @param {CreateTagDto} createTagDto - Data Transfer Object containing tag details.
     * @returns {Promise<Tag>} A promise that resolves to the created Tag entity.
     */
    async create(createTagDto: CreateTagDto): Promise<Tag> {
        return await this.createTag.execute(createTagDto);
    }

    /**
     * Updates an existing tag by its ID.
     * @param {string} id - The ID of the tag to update.
     * @param {UpdateTagDto} updateTagDto - Data Transfer Object containing updated tag details.
     * @returns {Promise<Tag>} A promise that resolves to the updated Tag entity.
     */
    async update(id: string, updateTagDto: UpdateTagDto): Promise<Tag> {
        return await this.updateTag.execute(id, updateTagDto);
    }

    /**
     * Deletes a tag by its ID.
     * @param {string} id - The ID of the tag to delete.
     * @returns {Promise<void>} A promise that resolves when the tag is successfully deleted.
     */
    async remove(id: string): Promise<void> {
        return await this.deleteTag.execute(id);
    }
}
