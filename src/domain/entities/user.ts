import { User as TypeOrmUser } from '@infrastructure/entities/user.entity';

export class User {
    id: string;

    firstName: string;

    lastName: string;

    email: string;

    constructor(
        id: string = '',
        firstName: string = '',
        lastName: string = '',
        email: string = ''
    ) {
        this.id = id;

        this.firstName = firstName.toLowerCase().trim();

        this.lastName = lastName.toLowerCase().trim();

        this.email = email.toLowerCase().trim();
    }

    static serializeUser(typeOrmUser: TypeOrmUser): User {
        const user = new User(
            typeOrmUser.id,
            typeOrmUser.firstName,
            typeOrmUser.lastName,
            typeOrmUser.password
        );

        return user;
    }

    static serializeAll(typeOrmUsers: Array<TypeOrmUser>): Array<User> {
        return typeOrmUsers.map((TUser) => this.serializeUser(TUser));
    }
}
