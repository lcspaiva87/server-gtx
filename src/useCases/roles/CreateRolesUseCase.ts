import { prisma } from '../../lib/prisma'

interface IUserRequesr {
  name: string
  description: string
}
class CreateRolesUseCase {
  async execute({ name, description }: IUserRequesr) {
    const roleAlreadyExists = await prisma.role.findFirst({
      where: {
        name,
      },
    })
    if (roleAlreadyExists) {
      throw new Error('Role already exists')
    }
    const role = await prisma.role.create({
      data: {
        name,
        description,
      },
    })
    return role
  }
}
export { CreateRolesUseCase }
