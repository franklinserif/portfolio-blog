import { autoInjectable } from 'tsyringe';
import { TagService } from '@application/services/tag.service';
import { Request, Response } from 'express';
import { CreateTagDto } from '@application/dtos/tags/createTag';
import { UpdateTagDto } from '@application/dtos/tags/updateTag';

@autoInjectable()
export class TagController {
    private readonly tagService: TagService;

    constructor(tagService: TagService) {
        this.tagService = tagService;
    }

    /**
     * Retrieves all tags.
     * @param {Request} _ - The request object (not used).
     * @param {Response} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the operation is complete.
     */
    async findAllTags(_: Request, res: Response): Promise<void> {
        const tags = await this.tagService.findAll();
        res.status(200).json(tags);
    }

    /**
     * Retrieves a single tag by its ID.
     * @param {Request} req - The request object containing the tag ID in params.
     * @param {Response} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the operation is complete.
     */
    async findTag(req: Request, res: Response): Promise<void> {
        const { id } = req.params as { id: string };

        const tag = await this.tagService.findOne(id);
        res.status(200).json(tag);
    }

    /**
     * Creates a new tag.
     * @param {Request} req - The request object containing the tag data in the body.
     * @param {Response} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the operation is complete.
     */
    async createTag(req: Request, res: Response): Promise<void> {
        const createTag: CreateTagDto = req.body;

        const tag = await this.tagService.create(createTag);
        res.status(201).json(tag);
    }

    /**
     * Updates an existing tag by its ID.
     * @param {Request} req - The request object containing the tag ID in params and update data in body.
     * @param {Response} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the operation is complete.
     */
    async updateTag(req: Request, res: Response): Promise<void> {
        const { id } = req.params as { id: string };
        const updateTag: UpdateTagDto = req.body;

        const tag = await this.tagService.update(id, updateTag);
        res.status(200).json(tag);
    }

    /**
     * Deletes a tag by its ID.
     * @param {Request} req - The request object containing the tag ID in params.
     * @param {Response} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the operation is complete.
     */
    async removeTag(req: Request, res: Response): Promise<void> {
        const { id } = req.params as { id: string };

        await this.tagService.remove(id);
        res.status(200).json({ message: 'Tag deleted successfully' });
    }
}
