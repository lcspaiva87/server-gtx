import { prisma } from '../../lib/prisma'

interface IUserRequesr {
  name: string
  description: string
}
class CreatePermissionUseCase {
  async execute({ name, description }: IUserRequesr) {
    const permissionsAlreadyExists = await prisma.permission.findFirst({
      where: {
        name,
      },
    })
    if (permissionsAlreadyExists) {
      throw new Error('Role already exists')
    }
    const permission = await prisma.permission.create({
      data: {
        name,
        description,
      },
    })
    return permission
  }
}
export { CreatePermissionUseCase }
