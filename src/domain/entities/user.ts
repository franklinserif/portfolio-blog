import { User as TypeOrmUser } from '@infrastructure/entities/user.entity';

export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;

    constructor({ id, firstName, lastName, email }: User) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    static serializeUser(typeOrmUser: TypeOrmUser): User {
        const user = new User({
            id: typeOrmUser.id,
            firstName: typeOrmUser.firstName,
            lastName: typeOrmUser.lastName,
            email: typeOrmUser.email
        });

        return user;
    }

    static serializeAll(typeOrmUsers: Array<TypeOrmUser>): Array<User> {
        return typeOrmUsers.map((TUser) => this.serializeUser(TUser));
    }
}
