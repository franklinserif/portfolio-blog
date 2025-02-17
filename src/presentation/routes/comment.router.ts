import { autoInjectable } from 'tsyringe';
import { BaseRouter } from '@presentation/routes/router';
import { CommentController } from '@presentation/controllers/comment.controller';

@autoInjectable()
export class CommentRouter extends BaseRouter {
    private readonly commentController: CommentController;

    constructor(commentController: CommentController) {
        super();
        this.commentController = commentController;
    }

    routes(): void {
        this.router.get('/comments', (req, res) =>
            this.commentController.findAllComment(req, res)
        );

        this.router.get('/comments/:id', (req, res) =>
            this.commentController.findComment(req, res)
        );

        this.router.post('/comments', (req, res) =>
            this.commentController.createComment(req, res)
        );

        this.router.put('/comments/:id', (req, res) =>
            this.commentController.updateComment(req, res)
        );

        this.router.delete('/comments/:id', (req, res) =>
            this.commentController.removeComment(req, res)
        );
    }
}
