import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { ensuredAuthenticated } from '../middlewares/ensureAuthenticated'
import { AuthenticateUserController } from '../useCases/authenticateUser/AuthenticateUserController'
import { CreateUserController } from '../useCases/createUser/CreateUserController'
import { RefreshTokenUserController } from '../useCases/refreshTokenUser/RefreshTokenUserController'

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const refreshTokenUserController = new RefreshTokenUserController()
async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/users', createUserController.handle)
  fastify.post('/login', authenticateUserController.handle)
  fastify.post('/refresh-token', refreshTokenUserController.handle)
  // Aplicando ensureAuthenticated à rota '/course'

  fastify.get(
    '/course',
    { preHandler: ensuredAuthenticated },
    (req: FastifyRequest, reply: FastifyReply) => {
      return reply.send([
        {
          id: 1,
          name: 'John Doe',
          email: 'aaa',
        },
        {
          id: 2,
          name: 'John Doe',
          email: 'aaa',
        },
        {
          id: 3,
          name: 'John Doe',
          email: 'aaa',
        },
      ])
    },
  )
}
export default userRoutes
