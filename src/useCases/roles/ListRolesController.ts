import { FastifyReply, FastifyRequest } from 'fastify'
import { ListRolesUseCase } from './ListRolesUseCase'
class ListRolesController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    try {
      const listRolesUseCase = new ListRolesUseCase()
      const list = await listRolesUseCase.execute()
      return reply.status(200).send({ data: list })
    } catch (err) {
      return reply.status(400).send({ messagem: err })
    }
  }
}
export { ListRolesController }
