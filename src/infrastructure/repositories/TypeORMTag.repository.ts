import { Repository } from 'typeorm';
import { Tag } from '@infrastructure/entities/tag.entity';
import { AppDataSource } from '@infrastructure/database/dataSource';
import { TagRepository } from '@domain/repositories/tag.repository';

export class TypeORMTagRepository implements TagRepository {
    private repository: Repository<Tag>;

    constructor() {
        this.repository = AppDataSource.getRepository(Tag);
    }

    /**
     * Retrieves all tags from the database.
     * @returns {Promise<Tag[]>} A promise that resolves to an array of tags.
     */
    async findAll(): Promise<Tag[]> {
        return await this.repository.find();
    }

    /**
     * Finds a tag by its ID.
     * @param {string} id - The ID of the tag to retrieve.
     * @returns {Promise<Tag>} A promise that resolves to the found tag.
     * @throws {Error} If the tag is not found.
     */
    async findOne(id: string): Promise<Tag> {
        const tag = await this.repository.findOne({ where: { id } });
        if (!tag) {
            throw new Error('Tag not found');
        }
        return tag;
    }

    /**
     * Creates a new tag and saves it to the database.
     * @param {Omit<Tag, 'checkFieldsBeforeInsert'>} tag - The tag data to create.
     * @returns {Promise<Tag>} A promise that resolves to the newly created tag.
     */
    async create(tag: Omit<Tag, 'checkFieldsBeforeInsert'>): Promise<Tag> {
        const newTag = this.repository.create(tag);
        return await this.repository.save(newTag);
    }

    /**
     * Updates an existing tag.
     * @param {string} id - The ID of the tag to update.
     * @param {Partial<Tag>} tag - The partial tag data to update.
     * @returns {Promise<Tag>} A promise that resolves to the updated tag.
     */
    async update(id: string, tag: Partial<Tag>): Promise<Tag> {
        await this.findOne(id);
        await this.repository.update(id, tag);
        return this.findOne(id);
    }

    /**
     * Removes a tag from the database.
     * @param {string} id - The ID of the tag to remove.
     * @returns {Promise<DeleteResult>} A promise that resolves to the result of the deletion.
     */
    async remove(id: string): Promise<void> {
        await this.findOne(id);
        await this.repository.delete(id);
    }
}
