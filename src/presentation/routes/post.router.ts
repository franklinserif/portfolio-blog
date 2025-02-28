import { autoInjectable } from 'tsyringe';
import { BaseRouter } from '@presentation/routes/router';
import { PostController } from '@presentation/controllers/post.controller';
import { validationMiddleware } from '@presentation/middlewares/validation.middleware';
import { CreatePostDto } from '@application/dtos/posts/createPost';
import { UpdatePostDto } from '@application/dtos/posts/updatePost';

@autoInjectable()
export class PostRouter extends BaseRouter {
    private readonly postController: PostController;

    constructor(postController: PostController) {
        super();
        this.postController = postController;
    }

    routes(): void {
        this.router.get('/posts', (req, res) =>
            this.postController.findAllPosts(req, res)
        );

        this.router.post(
            '/posts',
            validationMiddleware(CreatePostDto),
            (req, res) => this.postController.createPost(req, res)
        );

        this.router.get('/posts/:id', (req, res) =>
            this.postController.findPost(req, res)
        );

        this.router.put(
            '/posts/:id',
            validationMiddleware(UpdatePostDto),
            (req, res) => this.postController.updatePost(req, res)
        );

        this.router.delete('/posts/:id', (req, res) =>
            this.postController.removePost(req, res)
        );
    }
}
