import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUserAccessUseCase } from './CreateUserAccessUseCase'
interface IUserRequesr {
  IdUser: any
  idRole: any
  idPermission: any
}
class CreateUserAccessControll {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const { IdUser, idRole, idPermission } = <IUserRequesr>req.body

    const createUserAccessUseCase = new CreateUserAccessUseCase()
    const result = await createUserAccessUseCase.execute({
      IdUser,
      idRole,
      idPermission,
    })
    return reply
      .status(201)
      .send({ message: 'Users permission updated successfully' })
  }
}

export { CreateUserAccessControll }
