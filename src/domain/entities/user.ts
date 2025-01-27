export class User {
    id: string;

    firstName: string;

    lastName: string;

    email: string;

    password: string;

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ) {
        this.id = id;

        this.firstName = firstName.toLowerCase().trim();

        this.lastName = lastName.toLowerCase().trim();

        this.email = email.toLowerCase().trim();

        this.password = password;
    }
}
