import { Post as TypeOrmPost } from '@infrastructure/entities/post.entity';

export class Post {
    id: string;
    title: string;
    content: string;

    constructor({ id, title, content }: Post) {
        this.id = id;
        this.title = title;
        this.content = content;
    }

    static serializePost(typeOrmPost: TypeOrmPost): Post {
        const post = new Post({
            id: typeOrmPost.id,
            title: typeOrmPost.title,
            content: typeOrmPost.content
        });

        return post;
    }

    static serializeAll(typeOrmPosts: Array<TypeOrmPost>): Array<Post> {
        return typeOrmPosts.map((TPost) => this.serializePost(TPost));
    }
}
