import { FastifyReply, FastifyRequest } from 'fastify'
import { verify } from 'jsonwebtoken'
export const ensuredAuthenticated = () => {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const authToken = req.headers.authorization
    if (!authToken) {
      reply.status(401).send({ message: 'Token is missing' })
      return
    }
    const [, token] = authToken.split(' ')

    try {
      verify(token, '14308240-68e9-4821-a8a3-a6111f37e3df')

      return true
      // Se a autenticação for bem-sucedida, permite que o fluxo continue
    } catch (error) {
      reply.status(401).send({ message: 'Token is missing' })
    }
  }
}
