import { PostRepository } from '@domain/repositories/post.repository';

export class DeletePost {
    constructor(private readonly postRepository: PostRepository) {}

    async execute(id: string): Promise<void> {
        await this.postRepository.remove(id);
    }
}
