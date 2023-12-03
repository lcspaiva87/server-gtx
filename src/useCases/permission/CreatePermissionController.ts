import { Permission } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { CreatePermissionUseCase } from './CreatePermissionUseCase'

class CreatePermissionController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const { name, description } = <Permission>req.body

    const createPermissionUseCase = new CreatePermissionUseCase()

    const permission = await createPermissionUseCase.execute({
      name,
      description,
    })

    return reply.status(201).send({ data: permission })
  }
}
export { CreatePermissionController }
