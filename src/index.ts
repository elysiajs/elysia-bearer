import { Elysia, type Context } from 'elysia'

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
            query = 'access_token',
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
            query,
            header
        }
    }).derive(({ query: queries, headers: { authorization } }) => ({
        get bearer() {
            if ((authorization as string)?.startsWith(header))
                return (authorization as string).slice(header.length + 1)

            const q = queries[query]
            if (q) return q
        }
    }))

export default bearer
