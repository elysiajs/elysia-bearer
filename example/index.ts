import { Elysia } from 'elysia'
import { bearer } from '../src/index'

const app = new Elysia()
	.use(bearer())
	.get('/', () => 'Bearer')
	.get(
		'/sign',
		{
			beforeHandle({ bearer, set, status }) {
				if (!bearer) {
					set.headers['WWW-Authenticate'] =
						`Bearer realm='sign', error="invalid_request"`

					return status(400, 'Unauthorized')
				}
			}
		},
		({ bearer }) => bearer
	)
	.listen(3000)
