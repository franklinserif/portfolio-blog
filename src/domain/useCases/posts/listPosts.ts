import { Post } from '@domain/entities/post';
import { PostRepository } from '@domain/repositories/post.repository';

export class ListPosts {
    constructor(private readonly postRepository: PostRepository) {}

    async execute(): Promise<Post[]> {
        const posts = Post.serializeAll(await this.postRepository.findAll());

        return posts;
    }
}
