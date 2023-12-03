import { Task } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'

class CreateTaskController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const {} = <Task>req.body

    return reply.status(201).send({ data:  })
  }
}
