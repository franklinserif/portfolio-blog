import { Post as TypeOrmPost } from '@infrastructure/entities/post.entity';
import { User } from '@domain/entities/user';
import { Tag } from '@domain/entities/tag';
import { Comment } from '@domain/entities/comment';

export class Post {
    id: string;
    title: string;
    content: string;
    user: User;
    tags?: Array<Tag>;
    comments?: Array<Comment>;

    constructor({ id, title, content, user }: Post) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.user = user;
    }

    static serializePost(typeOrmPost: TypeOrmPost): Post {
        const post = new Post({
            id: typeOrmPost.id,
            title: typeOrmPost.title,
            content: typeOrmPost.content,
            user: typeOrmPost.user,
            tags: typeOrmPost.tags
        });

        return post;
    }

    static serializeAll(typeOrmPosts: Array<TypeOrmPost>): Array<Post> {
        return typeOrmPosts.map((TPost) => this.serializePost(TPost));
    }
}
