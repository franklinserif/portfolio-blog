import { autoInjectable } from 'tsyringe';
import { CreateTagDto } from '@application/dtos/tags/createTag';
import { UpdateTagDto } from '@application/dtos/tags/updateTag';
import { TagController } from '@presentation/controllers/tag.controller';
import { BaseRouter } from '@presentation/routes/router';
import { validationMiddleware } from '@shared/middlewares/validation.middleware';

@autoInjectable()
export class TagRouter extends BaseRouter {
    private readonly tagController: TagController;

    constructor(tagController: TagController) {
        super();
        this.tagController = tagController;
    }

    routes(): void {
        this.router.get('/tags', (req, res) =>
            this.tagController.findAllTags(req, res)
        );

        this.router.get('/tags/:id', (req, res) =>
            this.tagController.findTag(req, res)
        );

        this.router.post(
            '/tags',
            validationMiddleware(CreateTagDto),
            (req, res) => this.tagController.createTag(req, res)
        );

        this.router.put(
            '/tags/:id',
            validationMiddleware(UpdateTagDto),
            (req, res) => this.tagController.updateTag(req, res)
        );

        this.router.delete('/tags/:id', (req, res) =>
            this.tagController.removeTag(req, res)
        );
    }
}
