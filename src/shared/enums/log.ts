/**
 * @enum {string}
 * @readonly
 * @name logState
 * @description Defines standard logging severity levels for application logging.
 *              Follows common logging practice with hierarchy: error > warn > info > debug
 */
export enum logState {
    /**
     * @description Critical error conditions - application may be unable to continue
     */
    ERROR = 'error',

    /**
     * @description Potentially harmful situations or unexpected conditions
     */
    WARN = 'warn',

    /**
     * @description Informational messages about application flow
     */
    INFO = 'info',

    /**
     * @description Detailed debug information for development troubleshooting
     */
    DEBUG = 'debug'
}
