import { User as TypeOrmUser } from '@infrastructure/entities/user.entity';
import { Post } from './post';

export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    posts: Post[];

    constructor({ id, firstName, lastName, email, posts }: User) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.posts = posts;
    }

    static serializeUser(typeOrmUser: TypeOrmUser): User {
        const user = new User({
            id: typeOrmUser.id,
            firstName: typeOrmUser.firstName,
            lastName: typeOrmUser.lastName,
            email: typeOrmUser.email,
            posts: Post.serializeAll(typeOrmUser.posts || [])
        });

        return user;
    }

    static serializeAll(typeOrmUsers: Array<TypeOrmUser>): Array<User> {
        return typeOrmUsers.map((TUser) => this.serializeUser(TUser));
    }
}
