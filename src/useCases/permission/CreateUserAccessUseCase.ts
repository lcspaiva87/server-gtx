import { prisma } from '../../lib/prisma'
interface IUserRequesr {
  IdUser: any
  idRole: any
  idPermission: any
}
class CreateUserAccessUseCase {
  async execute({ IdUser, idRole, idPermission }: IUserRequesr) {
    const existingUser = await prisma.user.findUnique({
      where: {
        idUser: IdUser,
      },
    })
    const permissions = Array.isArray(idPermission)
      ? idPermission
      : [idPermission]
    if (!existingUser) {
      throw new Error('User not found')
    }
    for (const permissionId of permissions) {
      const existingPermission = await prisma.usersPermissions.findMany({
        where: {
          IdUser,
          idPermission: permissionId,
          idRole,
        },
      })

      if (existingPermission.length > 0) {
        throw new Error(`the user already has this permission`)
      }
    }
    const result = await prisma.usersPermissions.createMany({
      data: permissions.map((permissionId: any) => ({
        IdUser,
        idRole,
        idPermission: permissionId,
      })),
    })

    return result
  }
}

export { CreateUserAccessUseCase }
