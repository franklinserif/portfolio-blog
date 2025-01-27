/**
 * @enum {string}
 * @readonly
 * @name ServerState
 * @description Defines server environment states used to control application behavior
 *              and configuration. Aligns with common Node.js environment conventions.
 */
export enum ServerState {
    /**
     * @description Production environment - optimized for performance and security.
     *              Typically used for:
     *              - Live deployments
     *              - Client-facing instances
     *              - Minified/optimized builds
     */
    PRODUCTION = 'production',

    /**
     * @description Development environment - enhanced debugging capabilities.
     *              Typically used for:
     *              - Local development
     *              - Debugging
     *              - Testing new features
     */
    DEVELOPMENT = 'development'
}
