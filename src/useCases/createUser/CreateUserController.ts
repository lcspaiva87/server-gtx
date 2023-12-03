import { FastifyReply, FastifyRequest } from 'fastify'
import { typeRegisterUser } from '../authenticateUser/types'
import { CreateUserUseCase } from './CreateUserUserUseCase'

class CreateUserController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const { username, password, name } = typeRegisterUser.parse(req.body)
    const createUserUseCase = new CreateUserUseCase()

    const user = await createUserUseCase.execute({
      username,
      password,
      name,
    })
    return reply.status(201).send({ user })
  }
}
export { CreateUserController }
