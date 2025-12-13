import { Elysia } from 'elysia'
import { bearer } from '../src/index'

const app = new Elysia()
    .use(bearer())
    .get('/', () => 'Bearer')
    .get('/sign', ({ bearer }) => bearer, {
        beforeHandle({ bearer, set, status }) {
            if (!bearer) {
                set.headers[
                    'WWW-Authenticate'
                ] = `Bearer realm='sign', error="invalid_request"`

                return status(400, 'Unauthorized')
            }
        }
    })
    .listen(3000)
