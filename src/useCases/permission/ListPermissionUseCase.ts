import { prisma } from '../../lib/prisma'

class ListPermissionUseCase {
  async execute() {
    const list = await prisma.permission.findMany()
    return list
  }
}
export { ListPermissionUseCase }
