import bcrypt from 'bcrypt';

export abstract class Crypt {
    static saltRount = 10;

    constructor() {}

    static async hashPassword(password: string) {
        const salt = await bcrypt.genSalt(this.saltRount);

        const hashesPassword = bcrypt.hash(salt, password);

        return hashesPassword;
    }
}
