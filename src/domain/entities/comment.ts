import { Comment as TypeOrmComment } from '@infrastructure/entities/comment.entity';
import { Post } from '@domain/entities/post';

export class Comment {
    id: string;
    comment: string;
    email: string;
    emailHash: string;
    fullName: string;
    post: Post;

    constructor({ id, comment, email, emailHash, fullName, post }: Comment) {
        this.id = id;
        this.comment = comment;
        this.email = email;
        this.emailHash = emailHash;
        this.fullName = fullName;
        this.post = post;
    }

    static serializeComment(typeOrmComment: TypeOrmComment): Comment {
        const comment = new Comment({
            id: typeOrmComment.id,
            comment: typeOrmComment.comment,
            email: typeOrmComment.email,
            emailHash: typeOrmComment.emailHash,
            fullName: typeOrmComment.fullName,
            post: typeOrmComment.post
        });

        return comment;
    }

    static serializeAll(
        typeOrmComments: Array<TypeOrmComment>
    ): Array<Comment> {
        return typeOrmComments.map((TComment) =>
            this.serializeComment(TComment)
        );
    }
}
