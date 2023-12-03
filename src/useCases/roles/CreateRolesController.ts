import { Role } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateRolesUseCase } from './CreateRolesUseCase'

class CreateRolesController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const { name, description } = <Role>req.body
    const createRolesUseCase = new CreateRolesUseCase()

    const roles = await createRolesUseCase.execute({
      name,
      description,
    })

    return reply.status(201).send({ data: roles })
  }
}

export { CreateRolesController }
