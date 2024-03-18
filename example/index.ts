import { Elysia } from 'elysia'
import { bearer } from '../src/index'

const app = new Elysia({ precompile: true })
    .use(bearer())
    .get('/', () => 'Bearer')
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
    .listen(8080)
