import { Tag } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateTagUseCase } from './CreateTagUseCase'

class CreateTagController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, idCompany } = <Tag>req.body
      const createTagUseCase = new CreateTagUseCase()
      const tag = await createTagUseCase.execute({
        name,
        idCompany,
      })
      return reply
        .status(201)
        .send({ message: 'tag created successfully', data: tag })
    } catch (err) {
      return reply.status(400).send({ message: err })
    }
  }
}

export { CreateTagController }
