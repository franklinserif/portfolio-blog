/**
 * Interface defining the structure of a logger.
 * Provides methods for logging messages at different levels.
 */
export interface ILogger {
    /**
     * Logs an informational message.
     * @param {string} message - The message to log.
     * @returns {void}
     */
    info(message: string): void;

    /**
     * Logs a warning message.
     * @param {string} message - The message to log.
     * @returns {void}
     */
    warning(message: string): void;

    /**
     * Logs an error message.
     * @param {string} message - The message to log.
     * @returns {void}
     */
    error(message: string): void;

    /**
     * Logs a debug message.
     * @param {string} message - The message to log.
     * @returns {void}
     */
    debug(message: string): void;
}
