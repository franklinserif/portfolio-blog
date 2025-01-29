import { User as TypeOrmUser } from '@infrastructure/entities/user.entity';
import { ILogger } from '@shared/interfaces/logs';
import { Crypt } from '@shared/utils/crypt/crypt';
import { Logger } from '@shared/utils/logs/logger';

export class User {
    private readonly logger: ILogger = new Logger(User.name);

    id: string;

    firstName: string;

    lastName: string;

    email: string;

    password!: string;

    constructor(
        id: string = '',
        firstName: string = '',
        lastName: string = '',
        email: string = '',
        password: string = ''
    ) {
        this.id = id;

        this.firstName = firstName.toLowerCase().trim();

        this.lastName = lastName.toLowerCase().trim();

        this.email = email.toLowerCase().trim();

        Crypt.hashPassword(password)
            .then((encryptedPassword) => (this.password = encryptedPassword))
            .catch((error) =>
                this.logger.error(
                    `something went wrong encrypting the password ${error?.stack}`
                )
            );
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
