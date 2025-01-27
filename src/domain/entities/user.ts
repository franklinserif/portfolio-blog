export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id;
        this.firstName = firstName.toLowerCase().trim();
        this.lastName = lastName.toLowerCase().trim();
        this.email = email.toLowerCase().trim();
        this.password = password;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
