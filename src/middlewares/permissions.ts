import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../lib/prisma'

export function can(permissionsRoutes: string[]) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const { userID }: any = req.params
    const user = await prisma.usersPermissions.findMany({
      where: {
        IdUser: userID,
      },
      include: {
        permission: true,
        Role: true,
      },
    })
    if (!user || user.length === 0) {
      return reply.status(400).send('User does not exists')
    }
    // Aqui você pode acessar as permissões e funções do usuário
    const permissions = user
      .map((userPermission) => userPermission.Role?.name)
      .some((permission: any) => permissionsRoutes.includes(permission))
    if (!permissions) {
      return reply.status(400).send('Unauthorized')
    }
  }
}
