import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { ServerState } from '@shared/enums/server';
import { logState } from '@shared/enums/log';
import { config } from '@shared/utils/config/config';
import { ILogger } from '@shared/interfaces/logs';

export class Logger implements ILogger {
    private logger: winston.Logger;

    /**
     * Constructor for the Logger class.
     * Initializes the logger with the specified configuration.
     * @param {string} location - The location or context of the logs (e.g., module name).
     * @param {string} [filename='logs'] - The base filename for log files.
     * @param {string} [datePattern='YYYY-MM-DD HH:mm:ss'] - The timestamp format for logs.
     * @param {string} [maxFiles='30d'] - The maximum retention period for log files.
     */
    constructor(
        location: string,
        filename: string = 'logs',
        datePattern: string = 'YYYY-MM-DD HH:mm:ss',
        maxFiles: string = '30d'
    ) {
        const logFormat = this.configureLogFormat(datePattern, location);
        const transports = this.configureTransports({
            filename,
            maxFiles,
            format: logFormat
        });

        this.logger = winston.createLogger({
            level:
                config.NODE_ENV === ServerState.PRODUCTION
                    ? logState.INFO
                    : logState.DEBUG,
            transports,
            format: logFormat
        });
    }

    /**
     * Configures the log format for Winston.
     * @param {string} datePattern - The timestamp format for logs.
     * @param {string} location - The location or context of the logs.
     * @returns {winston.Logform.Format} - The configured log format.
     */
    private configureLogFormat(
        datePattern: string,
        location: string
    ): winston.Logform.Format {
        return winston.format.combine(
            winston.format.timestamp({ format: datePattern }),
            winston.format.errors({ stack: true }),
            winston.format.printf(({ timestamp, level, message, stack }) => {
                // Custom log format
                return `${timestamp} [${level.toUpperCase()} - ${location}]: ${message}${stack ? `\n${stack}` : ''}`;
            })
        );
    }

    /**
     * Configures the transports for Winston.
     * @param {Object} options - Configuration options for transports.
     * @param {string} options.filename - The base filename for log files.
     * @param {string} options.maxFiles - The maximum retention period for log files.
     * @param {winston.Logform.Format} options.format - The log format.
     * @returns {winston.transport[]} - An array of configured transports.
     */
    private configureTransports({
        filename,
        maxFiles,
        format
    }: {
        filename: string;
        maxFiles: string;
        format: winston.Logform.Format;
    }): winston.transport[] {
        return [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize({ all: true }),
                    winston.format.printf(
                        ({ timestamp, level, message, stack }) => {
                            return `${timestamp} [${level}]: ${message}${stack ? `\n${stack}` : ''}`;
                        }
                    )
                )
            }),
            new DailyRotateFile({
                filename: `${filename}/error-%DATE%.log`,
                datePattern: 'YYYY-MM-DD',
                level: 'error',
                maxFiles,
                format
            }),
            new DailyRotateFile({
                filename: `${filename}/combined-%DATE%.log`,
                datePattern: 'YYYY-MM-DD',
                maxFiles,
                format
            })
        ];
    }

    /**
     * Logs an informational message.
     * @param {string} message - The message to log.
     * @returns {void}
     */
    info(message: string): void {
        this.logger.info(message);
    }

    /**
     * Logs a warning message.
     * @param {string} message - The message to log.
     * @returns {void}
     */
    warning(message: string): void {
        this.logger.warn(message);
    }

    /**
     * Logs an error message.
     * @param {string} message - The message to log.
     * @returns {void}
     */
    error(message: string): void {
        this.logger.error(message);
    }

    /**
     * Logs a debug message.
     * @param {string} message - The message to log.
     * @returns {void}
     */
    debug(message: string): void {
        this.logger.debug(message);
    }
}
