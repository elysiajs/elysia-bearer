import { Elysia } from 'elysia'

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
        body?: string
        /**
         * Determined which fields to be identified as Bearer token
         *
         * @default access_token
         */
        query?: string
        /**
         * Determined which type of Authentication should be Bearer token
         *
         * @default Bearer
         */
        header?: string
    }
}

export const bearer = (
    {
        extract: {
            body = 'access_token',
            query: queryName = 'access_token',
            header = 'Bearer'
        } = {
            body: 'access_token',
            query: 'access_token',
            header: 'Bearer'
        }
    }: BearerOptions = {
        extract: {
            body: 'access_token',
            query: 'access_token',
            header: 'Bearer'
        }
    }
) =>
    new Elysia({
        name: '@elysiajs/bearer',
        seed: {
            body,
            query: queryName,
            header
        }
    }).derive({ as: 'global' }, ({ query, headers: { authorization: authorizationHeader } }) => ({
        get bearer() {

            if (authorizationHeader?.startsWith(header))
                return authorizationHeader.slice(header.length + 1)

            const tokenFromQuery = query[queryName]
            if (tokenFromQuery) return tokenFromQuery;

            return;
        }
    }))

export default bearer
