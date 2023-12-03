import { FastifyReply, FastifyRequest } from 'fastify'
import { ListTagUseCase } from './ListTagUseCase'

class ListTagUseController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    try {
      const listTagUseCase = new ListTagUseCase()
      return reply
        .status(200)
        .send({ message: 'tag list successfully', listTagUseCase })
    } catch (err) {
      return reply.status(400).send({ message: err })
    }
  }
}
export { ListTagUseController }
