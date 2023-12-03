import { FastifyReply, FastifyRequest } from 'fastify'
import { RefreshTokenUserUseCase } from './RefreshTokenUserUseCase'
import { typerefreshTokenUseCase } from './types'
class RefreshTokenUserController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    // eslint-disable-next-line camelcase
    const { refresh_token } = typerefreshTokenUseCase.parse(req.body)
    const refreshTokenUseCase = new RefreshTokenUserUseCase()
    const token = await refreshTokenUseCase.execute(refresh_token)
    return reply.status(201).send({ token })
  }
}
export { RefreshTokenUserController }
