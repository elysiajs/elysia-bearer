import { Elysia } from 'elysia'
import { bearer } from '../src'

import { describe, expect, it } from 'bun:test'
const app = new Elysia()
    .use(bearer())
    .get('/sign', ({ bearer }) => bearer, {
        beforeHandle({ bearer, set }) {
            if (!bearer) {
                set.status = 400
                set.headers[
                    'WWW-Authenticate'
                    ] = `Bearer realm='sign', error="invalid_request"`

                return 'Unauthorized'
            }
        }
    })

const nonRFC = new Elysia()
    .use(
        bearer({
            extract: {
                body: 'a',
                header: 'a',
                query: 'a'
            }
        })
    )
    .get('/sign', ({ bearer }) => bearer, {
        beforeHandle({ bearer, set }) {
            if (!bearer) {
                set.status = 400
                set.headers[
                    'WWW-Authenticate'
                    ] = `Bearer realm='sign', error="invalid_request"`

                return 'Unauthorized'
            }
        }
    })

describe('Bearer', () => {
    it('parse bearer from header', async () => {
        const res = await app
            .handle(
                new Request('http://localhost/sign', {
                    headers: {
                        Authorization: 'Bearer saltyAom'
                    }
                })
            )
            .then((r) => r.text())

        expect(res).toBe('saltyAom')
    })

    it("don't parse empty Bearer header", async () => {
        const res = await app.handle(
            new Request('http://localhost/sign', {
                headers: {
                    Authorization: 'Bearer '
                }
            })
        )

        expect(res.status).toBe(400)
    })

    it('parse bearer from query', async () => {
        const res = await app
            .handle(new Request('http://localhost/sign?access_token=saltyAom'))
            .then((r) => r.text())

        expect(res).toBe('saltyAom')
    })

    it('parse bearer from custom header', async () => {
        const res = await nonRFC
            .handle(
                new Request('http://localhost/sign', {
                    headers: {
                        Authorization: 'a saltyAom'
                    }
                })
            )
            .then((r) => r.text())

        expect(res).toBe('saltyAom')
    })

    it('parse bearer from custom query', async () => {
        const res = await nonRFC
            .handle(new Request('http://localhost/sign?a=saltyAom'))
            .then((r) => r.text())

        expect(res).toBe('saltyAom')
    })
})
