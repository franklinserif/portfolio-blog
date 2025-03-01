import { autoInjectable } from 'tsyringe';
import { BaseRouter } from '@presentation/routes/router';
import { CommentController } from '@presentation/controllers/comment.controller';
import { CreateCommentDto } from '@application/dtos/comments/createComment';
import { validationMiddleware } from '@presentation/middlewares/validation.middleware';
import { UpdateCommentDto } from '@application/dtos/comments/updateComment';
import { IdParamDto } from '@shared/dtos/idParam.dto';
import { REQUEST } from '@shared/enums/data';

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

        this.router.get(
            '/comments/:id',
            validationMiddleware(IdParamDto, REQUEST.PARAMS),
            (req, res) => this.commentController.findComment(req, res)
        );

        this.router.post(
            '/comments',
            validationMiddleware(CreateCommentDto),
            (req, res) => this.commentController.createComment(req, res)
        );

        this.router.put(
            '/comments/:id',
            validationMiddleware(IdParamDto, REQUEST.PARAMS),
            validationMiddleware(UpdateCommentDto),
            (req, res) => this.commentController.updateComment(req, res)
        );

        this.router.delete(
            '/comments/:id',
            validationMiddleware(IdParamDto, REQUEST.PARAMS),
            (req, res) => this.commentController.removeComment(req, res)
        );
    }
}
