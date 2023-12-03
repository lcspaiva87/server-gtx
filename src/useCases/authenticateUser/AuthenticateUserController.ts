import { FastifyRequest } from 'fastify'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'
import { UserLogin } from './types'

class AuthenticateUserController {
  async handle(req: FastifyRequest) {
    const { email, password } = UserLogin.parse(req.body)
    const authenticateUserUseCase = new AuthenticateUserUseCase()
    const token = await authenticateUserUseCase.execute({ email, password })
    return token
  }
}
export { AuthenticateUserController }
