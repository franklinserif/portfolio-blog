import { autoInjectable } from 'tsyringe';
import { Request, Response } from 'express';
import { PostService } from '@application/services/post.service';
import { CreatePostDto } from '@application/dtos/posts/createPost';
import { UpdatePostDto } from '@application/dtos/posts/updatePost';

@autoInjectable()
export class PostController {
    private readonly postService: PostService;

    constructor(postService: PostService) {
        this.postService = postService;
    }

    /**
     * Handles the request to find a post by its ID.
     * @param {Request} req - The Express request object.
     * @param {Response} res - The Express response object.
     * @returns {Promise<void>} - A promise that resolves when the response is sent.
     */
    async findPost(req: Request, res: Response): Promise<void> {
        const { id } = req.params as { id: string };

        const post = await this.postService.findOne(id);

        res.status(200).json(post);
    }

    /**
     * Handles the request to find all posts.
     * @param {Request} _ - The Express request object (unused).
     * @param {Response} res - The Express response object.
     * @returns {Promise<void>} - A promise that resolves when the response is sent.
     */
    async findAllPosts(_: Request, res: Response): Promise<void> {
        const posts = await this.postService.findAll();

        res.status(200).json(posts);
    }

    /**
     * Handles the request to create a new post.
     * @param {Request} req - The Express request object containing the post data.
     * @param {Response} res - The Express response object.
     * @returns {Promise<void>} - A promise that resolves when the response is sent.
     */
    async createPost(req: Request, res: Response): Promise<void> {
        const createPostDto: CreatePostDto = req.body;

        const post = await this.postService.create(createPostDto);

        res.status(200).json(post);
    }

    /**
     * Handles the request to update an existing post.
     * @param {Request} req - The Express request object containing the post ID and updated data.
     * @param {Response} res - The Express response object.
     * @returns {Promise<void>} - A promise that resolves when the response is sent.
     */
    async updatePost(req: Request, res: Response): Promise<void> {
        const { id } = req.params as { id: string };
        const updatePostDto: UpdatePostDto = req.body;

        const post = await this.postService.update(id, updatePostDto);

        res.status(200).json(post);
    }

    /**
     * Handles the request to delete a post by its ID.
     * @param {Request} req - The Express request object containing the post ID.
     * @param {Response} res - The Express response object.
     * @returns {Promise<void>} - A promise that resolves when the response is sent.
     */
    async removePost(req: Request, res: Response): Promise<void> {
        const { id } = req.params as { id: string };

        await this.postService.remove(id);

        res.status(200).send({ message: 'Post deleted successfully' });
    }
}
