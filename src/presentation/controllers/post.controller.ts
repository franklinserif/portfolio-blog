import { Request, Response } from 'express';
import { PostService } from '@application/services/post.service';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export class PostController {
    private readonly postService: PostService;

    constructor(postService: PostService) {
        this.postService = postService;
    }

    async findPost(req: Request, res: Response): Promise<void> {
        const { id } = req.params as { id: string };

        const post = await this.postService.findOne(id);

        res.status(200).json(post);
    }

    async findAllPosts(_: Request, res: Response): Promise<void> {
        const posts = await this.postService.findAll();

        res.status(200).json(posts);
    }

    async createPost(req: Request, res: Response): Promise<void> {
        const createPostDto = req.body;

        const post = await this.postService.create(createPostDto);

        res.status(200).json(post);
    }

    async updatePost(req: Request, res: Response): Promise<void> {
        const { id } = req.params as { id: string };
        const updatePostDto = req.body;

        const post = await this.postService.update(id, updatePostDto);

        res.status(200).json(post);
    }

    async removePost(req: Request, res: Response): Promise<void> {
        const { id } = req.params as { id: string };

        await this.postService.remove(id);

        res.status(200).send({ message: 'Post deleted successfully' });
    }
}
