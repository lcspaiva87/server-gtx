import { prisma } from '../../lib/prisma'

class ListRolesUseCase {
  async execute() {
    const list = await prisma.role.findMany()
    return list
  }
}
export { ListRolesUseCase }
