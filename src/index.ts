import { KingWorld, type Context } from 'kingworld'

export interface BearerRequest {
    bearer: string | undefined
}

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

export const bearer =
    (
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
    (app: KingWorld) =>
        app.onTransform((ctx) => {
            Object.assign(ctx, {
                get bearer() {
                    const authorization =
                        ctx.request.headers.get('Authorization')
                    if (authorization?.startsWith(header))
                        return authorization.slice(header.length + 1)

                    // No Form-Encoded Body Parameter support atm, skip

                    const q = ctx.query?.[query]
                    if (q) return q

                    return undefined
                }
            } as BearerRequest)
        }) as unknown as KingWorld<{
            store: {}
            request: BearerRequest
            schema: {}
        }>

export default bearer
