import dotenv from 'dotenv';

dotenv.config();

export const config = {
    /**
     * @type {string}
     * @default 'development'
     * @description Current environment mode. Falls back to 'development' if not specified.
     * @see {@link https://nodejs.org/api/process.html#process_process_env Node.js process.env}
     */
    NODE_ENV: process.env.NODE_ENV || 'development',

    /**
     * @type {number}
     * @default 3000
     * @description Port number for the server to listen on.
     * @throws {TypeError} Will throw if port can't be parsed to a number.
     */
    PORT: process.env.PORT ? Number(process.env.PORT) : 3000,

    /**
     * @type {string}
     * @description Database host address.
     */
    DB_HOST: process.env.DB_HOST,

    /**
     * @type {string}
     * @description Database port number.
     */
    DB_PORT: +(process.env.DB_PORT || '5444'),

    /**
     * @type {string}
     * @description Database name.
     */
    DB_NAME: process.env.DB_NAME,

    /**
     * @type {string}
     * @description Database username.
     */
    DB_USERNAME: process.env.DB_USERNAME,

    /**
     * @type {string}
     * @description Database password.
     */
    DB_PASSWORD: process.env.DB_PASSWORD
};

/**
 * @description Validates required configuration values.
 * @throws {Error} Throws an error if any required configuration is missing or invalid.
 * @example
 * // Throws an error if PORT is missing or invalid
 * validateConfig();
 */
function validateConfig() {
    if (!config.PORT || isNaN(config.PORT)) {
        throw new Error('Invalid PORT configuration');
    }
}

// Validate configuration on startup
validateConfig();
