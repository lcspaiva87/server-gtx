import { Tag } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { EditTagIUseCase } from './EditTagUseCase'

class EditTagController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { idCompany, idTag, name } = <Tag>req.body
      const editTagUseCase = new EditTagIUseCase()
      const editTag = await editTagUseCase.execute({
        idCompany,
        idTag,
        name,
      })
      return reply
        .status(200)
        .send({ message: 'tag edited successfully', editTag })
    } catch (err) {
      return reply.status(400).send({ message: err })
    }
  }
}
export { EditTagController }
