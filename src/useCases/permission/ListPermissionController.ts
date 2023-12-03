import { FastifyReply, FastifyRequest } from 'fastify'
import { ListPermissionUseCase } from './ListPermissionUseCase'

class ListPermissionController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    try {
      const listPermissionUseCase = new ListPermissionUseCase()
      const list = await listPermissionUseCase.execute()
      return reply.status(200).send({ data: list })
    } catch (err) {
      return reply.status(400).send({ messagem: err })
    }
  }
}
export { ListPermissionController }
