/* eslint-disable @typescript-eslint/no-explicit-any */
export class HttpException extends Error {
    constructor(
        public readonly statusCode: number,
        public readonly message: string,
        public readonly details?: any
    ) {
        if (details instanceof HttpException) {
            throw details;
        }

        super(message);
        Object.setPrototypeOf(this, HttpException.prototype);
    }
}
