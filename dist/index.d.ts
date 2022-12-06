import { Elysia } from 'elysia';
export interface BearerOptions {
    /**
     * If the API doesn't compliant with RFC6750
     * The key for extracting the token is configurable
     */
    extract: {
        /**
         * Determined which fields to be identified as Bearer token
         *
         * @default access_token
         */
        body?: string;
        /**
         * Determined which fields to be identified as Bearer token
         *
         * @default access_token
         */
        query?: string;
        /**
         * Determined which type of Authentication should be Bearer token
         *
         * @default Bearer
         */
        header?: string;
    };
}
export declare const bearer: ({ extract: { body, query, header } }?: BearerOptions) => (app: Elysia) => Elysia<{
    store: {};
    request: {
        readonly bearer: string | undefined;
    };
    schema: {};
}>;
export default bearer;
